import Immutable from 'seamless-immutable';
import numeral from 'numeral';
import commonUtilitiesHelper from '../common/commonUtilitiesHelper';
import getMostRecentVMTasksFromRequests from '../Overview/components/Migrations/helpers/getMostRecentVMTasksFromRequests';
import { IsoElapsedTime } from '../../../../components/dates/IsoElapsedTime';

import {
  FETCH_V2V_PLAN,
  FETCH_V2V_ALL_REQUESTS_WITH_TASKS_FOR_PLAN,
  QUERY_V2V_PLAN_VMS,
  RESET_PLAN_STATE,
  FETCH_V2V_MIGRATION_TASK_LOG,
  DOWNLOAD_LOG_CLICKED,
  DOWNLOAD_LOG_COMPLETED,
  FETCH_V2V_ANSIBLE_PLAYBOOK_TEMPLATE,
  V2V_MIGRATION_STATUS_MESSAGES,
  FETCH_V2V_ORCHESTRATION_STACK,
  REMOVE_TASKS_SELECTED_FOR_CANCELLATION,
  UPDATE_TASKS_SELECTED_FOR_CANCELLATION,
  DELETE_ALL_TASKS_SELECTED_FOR_CANCELLATION,
  ADD_TASKS_TO_MARKED_FOR_CANCELLATION,
  ADD_TASK_TO_NOTIFICATION_SENT_LIST
} from './PlanConstants';

export const initialState = Immutable({
  isFetchingPlanRequest: false,
  isRejectedPlanRequest: false,
  planRequestPreviouslyFetched: false,
  errorPlanRequest: null,
  planRequestTasks: [],
  planRequestFailed: false,
  isFetchingPlan: false,
  isRejectedPlan: false,
  errorPlan: null,
  plan: {},
  planArchived: false,
  isQueryingVms: false,
  isRejectedVms: false,
  errorVms: null,
  vms: [],
  isFetchingAnsiblePlaybookTemplate: false,
  isRejectedAnsiblePlaybookTemplate: false,
  errorAnsiblePlaybookTemplate: null,
  ansiblePlaybookTemplate: {},
  isFetchingOrchestrationStack: false,
  isRejectedOrchestrationStack: false,
  errorOrchestrationStack: null,
  orchestrationStack: {},
  selectedTasksForCancel: [],
  markedForCancellation: [],
  failedMigrations: [],
  successfulMigrations: [],
  notificationsSentList: []
});

const excludeDownloadDoneTaskId = (allDownloadLogInProgressTaskIds, taskId) =>
  allDownloadLogInProgressTaskIds.filter(element => element !== taskId);

const includeDownloadInProgressTaskId = (allDownloadLogInProgressTaskIds, taskId) =>
  allDownloadLogInProgressTaskIds ? allDownloadLogInProgressTaskIds.concat(taskId) : [taskId];

const removeCancelledTasksFromSelection = (allSelectedTasksForCancel, alreadyCancelledTasks) =>
  allSelectedTasksForCancel.filter(selectedTask =>
    alreadyCancelledTasks.every(cancelledTask => selectedTask.id !== cancelledTask.id)
  );

const taskCompletedSuccessfully = task => task.state === 'finished' && task.status === 'Ok';

const taskCompletedUnsuccessfully = task => task.state === 'finished' && task.status !== 'Ok';

const taskCompleted = task => taskCompletedSuccessfully(task) || taskCompletedUnsuccessfully(task);

const processVMTasks = vmTasks => {
  const tasks = [];
  vmTasks.forEach(task => {
    const taskDetails = {
      id: task.id,
      message: V2V_MIGRATION_STATUS_MESSAGES[task.message] || __('VM migrations stalled'),
      transformation_host_name: task.options && task.options.transformation_host_name,
      delivered_on: new Date(task.options.delivered_on),
      updated_on: new Date(task.updated_on),
      completed: taskCompleted(task),
      // completed:
      // task.message === STATUS_MESSAGE_KEYS.VM_MIGRATIONS_COMPLETED ||
      // task.message === STATUS_MESSAGE_KEYS.VM_MIGRATIONS_FAILED ||
      // task.message === STATUS_MESSAGE_KEYS.FAILED ||
      // (!V2V_MIGRATION_STATUS_MESSAGES[task.message] && task.state === 'finished'),
      state: task.state,
      status: task.status,
      options: {},
      cancel_requested: task.options.cancel_requested
    };

    if (task.options.playbooks) {
      taskDetails.options.prePlaybookRunning =
        task.options.playbooks.pre && task.options.playbooks.pre.job_state === 'active';
      taskDetails.options.postPlaybookRunning =
        task.options.playbooks.post && task.options.playbooks.post.job_state === 'active';
      taskDetails.options.prePlaybookComplete =
        task.options.playbooks.pre && task.options.playbooks.pre.job_state === 'finished';
      taskDetails.options.postPlaybookComplete =
        task.options.playbooks.post && task.options.playbooks.post.job_state === 'finished';
      taskDetails.options.playbooks = task.options.playbooks;
    }

    taskDetails.options.progress = task.options.progress;
    taskDetails.options.virtv2v_wrapper = task.options.virtv2v_wrapper;

    if (!task.diskSpaceCompletedGb) {
      taskDetails.diskSpaceCompletedGb = '0';
    }

    if (!task.percentComplete) {
      taskDetails.percentComplete = 0;
    }

    if (!task.totalDiskSpaceGb) {
      taskDetails.totalDiskSpaceGb = '100%';
    }

    const grepVMName = task.description.match(/\[(.*?)\]/);

    if (grepVMName) {
      [taskDetails.descriptionPrefix, taskDetails.vmName] = grepVMName;
    }

    const startDateTime = taskDetails.delivered_on;
    const lastUpdateDateTime = taskDetails.updated_on;
    taskDetails.startDateTime = startDateTime;
    taskDetails.lastUpdateDateTime = lastUpdateDateTime;

    taskDetails.elapsedTime = IsoElapsedTime(new Date(startDateTime), new Date(lastUpdateDateTime));

    if (taskDetails.completed) {
      taskDetails.completedSuccessfully =
        (task.options.progress && task.options.progress.current_description === 'Virtual machine migrated') ||
        (task.options.progress && task.options.progress.current_description === 'Mark source as migrated');
    }
    if (task.options && task.options.virtv2v_disks && task.options.virtv2v_disks.length) {
      taskDetails.totalDiskSpace = task.options.virtv2v_disks.reduce((a, b) => a + b.size, 0);
      taskDetails.totalDiskSpaceGb = numeral(taskDetails.totalDiskSpace).format('0.00b');

      const percentComplete =
        task.options.virtv2v_disks.reduce((a, b) => a + b.percent, 0) / (100 * task.options.virtv2v_disks.length);

      taskDetails.diskSpaceCompleted = percentComplete * taskDetails.totalDiskSpace;
      taskDetails.diskSpaceCompletedGb = numeral(taskDetails.diskSpaceCompleted).format('0.00b');
      taskDetails.percentComplete = Math.round(percentComplete * 1000) / 10;
    }
    tasks.push(taskDetails);
  });
  return tasks;
};

const allVMTasksForRequestOfPlan = (requestWithTasks, actions) => {
  const tasksOfPlan = getMostRecentVMTasksFromRequests(requestWithTasks, actions);
  return processVMTasks(tasksOfPlan);
};

const incompleteCancellationTasks = (requestWithTasks, actions, tasksForCancel) => {
  const tasksOfPlan = getMostRecentVMTasksFromRequests(requestWithTasks, actions);
  const completedTasksOfPlan = tasksOfPlan.filter(task => task.state === 'finished');
  return removeCancelledTasksFromSelection(tasksForCancel, completedTasksOfPlan);
};

const getFailedMigrations = vmTasks => vmTasks.filter(task => taskCompletedUnsuccessfully(task));

const getSuccessfulMigrations = vmTasks => vmTasks.filter(task => taskCompletedSuccessfully(task));

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_PLAN}_PENDING`:
      return state.set('isFetchingPlan', true).set('isRejectedPlan', false);
    case `${FETCH_V2V_PLAN}_FULFILLED`:
      return state
        .set('plan', action.payload.data)
        .set('planName', action.payload.data.name)
        .set('planArchived', !!action.payload.data.archived)
        .set('isFetchingPlan', false)
        .set('isRejectedPlan', false)
        .set('errorPlan', null);
    case `${FETCH_V2V_PLAN}_REJECTED`:
      return state
        .set('isFetchingPlan', false)
        .set('isRejectedPlan', true)
        .set('errorPlan', action.payload);

    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS_FOR_PLAN}_PENDING`:
      return state.set('isFetchingPlanRequest', true).set('isRejectedPlanRequest', false);
    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS_FOR_PLAN}_FULFILLED`:
      if (action.payload.data) {
        const vmTasksForRequestOfPlan = allVMTasksForRequestOfPlan(
          action.payload.data.results,
          state.plan.options.config_info.actions
        );
        return state
          .set('planRequestTasks', vmTasksForRequestOfPlan)
          .set(
            'selectedTasksForCancel',
            incompleteCancellationTasks(
              action.payload.data.results,
              state.plan.options.config_info.actions,
              state.selectedTasksForCancel
            )
          )
          .set('allRequestsWithTasksForPlan', action.payload.data.results)
          .set('planRequestPreviouslyFetched', true)
          .set(
            'planRequestFailed',
            commonUtilitiesHelper.getMostRecentEntityByCreationDate(action.payload.data.results).status === 'Error'
          )
          .set('failedMigrations', getFailedMigrations(vmTasksForRequestOfPlan))
          .set('successfulMigrations', getSuccessfulMigrations(vmTasksForRequestOfPlan))
          .set('isRejectedPlanRequest', false)
          .set('errorPlanRequest', null)
          .set('isFetchingPlanRequest', false);
      }
      return state
        .set('planRequestPreviouslyFetched', true)
        .set('isRejectedPlanRequest', false)
        .set('errorPlanRequest', null)
        .set('isFetchingPlanRequest', false);
    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS_FOR_PLAN}_REJECTED`:
      return state
        .set('errorPlanRequest', action.payload)
        .set('isRejectedPlanRequest', true)
        .set('isFetchingPlanRequest', false);

    case `${QUERY_V2V_PLAN_VMS}_PENDING`:
      return state.set('isQueryingVms', true).set('isRejectedVms', false);
    case `${QUERY_V2V_PLAN_VMS}_FULFILLED`:
      return state
        .set('vms', action.payload.data.results)
        .set('isQueryingVms', false)
        .set('isRejectedVms', false)
        .set('errorVms', null);
    case `${QUERY_V2V_PLAN_VMS}_REJECTED`:
      return state
        .set('isQueryingVms', false)
        .set('isRejectedVms', true)
        .set('errorVms', action.payload);

    case RESET_PLAN_STATE:
      return state
        .set('planRequestTasks', [])
        .set('vms', [])
        .set('planRequestPreviouslyFetched', false)
        .set('markedForCancellation', [])
        .set('selectedTasksForCancel', []);

    case `${FETCH_V2V_MIGRATION_TASK_LOG}_PENDING`:
      return state.set('isFetchingMigrationTaskLog', true).set('isRejectedMigrationTaskLog', false);
    case `${FETCH_V2V_MIGRATION_TASK_LOG}_FULFILLED`:
      return state
        .set('isFetchingMigrationTaskLog', false)
        .set('isRejectedMigrationTaskLog', false)
        .set('errorMigrationTaskLog', null);
    case `${FETCH_V2V_MIGRATION_TASK_LOG}_REJECTED`:
      return state
        .set('isFetchingMigrationTaskLog', false)
        .set('isRejectedMigrationTaskLog', true)
        .set('errorMigrationTaskLog', action.payload);

    case `${FETCH_V2V_ANSIBLE_PLAYBOOK_TEMPLATE}_PENDING`:
      return state.set('isFetchingAnsiblePlaybookTemplate', true).set('isRejectedAnsiblePlaybookTemplate', false);
    case `${FETCH_V2V_ANSIBLE_PLAYBOOK_TEMPLATE}_FULFILLED`:
      return state
        .set('ansiblePlaybookTemplate', action.payload.data)
        .set('isFetchingAnsiblePlaybookTemplate', false)
        .set('isRejectedAnsiblePlaybookTemplate', false)
        .set('errorAnsiblePlaybookTemplate', null);
    case `${FETCH_V2V_ANSIBLE_PLAYBOOK_TEMPLATE}_REJECTED`:
      return state
        .set('isFetchingAnsiblePlaybookTemplate', false)
        .set('isRejectedAnsiblePlaybookTemplate', true)
        .set('errorAnsiblePlaybookTemplate', action.payload);

    case `${FETCH_V2V_ORCHESTRATION_STACK}_PENDING`:
      return state.set('isFetchingOrchestrationStack', true).set('isRejectedOrchestrationStack', false);
    case `${FETCH_V2V_ORCHESTRATION_STACK}_FULFILLED`:
      return state
        .set('orchestrationStack', action.payload.data)
        .set('isFetchingOrchestrationStack', false)
        .set('isRejectedOrchestrationStack', false)
        .set('errorOrchestrationStack', null);
    case `${FETCH_V2V_ORCHESTRATION_STACK}_REJECTED`:
      return state
        .set('isFetchingOrchestrationStack', false)
        .set('isRejectedOrchestrationStack', true)
        .set('errorOrchestrationStack', action.payload);

    case DOWNLOAD_LOG_CLICKED:
      return state.set(
        'downloadLogInProgressTaskIds',
        includeDownloadInProgressTaskId(state.downloadLogInProgressTaskIds, action.payload)
      );
    case DOWNLOAD_LOG_COMPLETED:
      return state.set(
        'downloadLogInProgressTaskIds',
        excludeDownloadDoneTaskId(state.downloadLogInProgressTaskIds, action.payload)
      );

    case REMOVE_TASKS_SELECTED_FOR_CANCELLATION:
      return state.set(
        'selectedTasksForCancel',
        removeCancelledTasksFromSelection(state.selectedTasksForCancel, action.payload)
      );

    case ADD_TASKS_TO_MARKED_FOR_CANCELLATION:
      return state.set('markedForCancellation', state.markedForCancellation.concat(action.payload));

    case UPDATE_TASKS_SELECTED_FOR_CANCELLATION:
      return state.set('selectedTasksForCancel', action.payload);

    case DELETE_ALL_TASKS_SELECTED_FOR_CANCELLATION:
      return state.set('selectedTasksForCancel', []);

    case ADD_TASK_TO_NOTIFICATION_SENT_LIST:
      return state.set('notificationsSentList', state.notificationsSentList.concat(action.payload));

    default:
      return state;
  }
};
