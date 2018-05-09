class MigrationLogController < ApplicationController
  def download_migration_log
    plan_task = ServiceTemplateTransformationPlanTask.find(params[:id])
    miq_tasks_id = plan_task.transformation_log_queue()
    task = MiqTask.wait_for_taskid(miq_tasks_id, :timeout => 5) #109

    render :json => {
      :log_contents   => task.task_results,
      :status         => task.status,
      :status_message => task.status == "Ok" ? task.message : _("Could not retrieve migration log. Reason - '%{reason}'") % {:reason => task.message}
    }
  end
end