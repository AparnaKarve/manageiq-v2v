export const migrationPlan = {
  href: 'http://localhost:3000/api/service_templates/1',
  name: 'Migration Plan',
  options: {
    config_info: {
      transformation_mapping_id: '1',
      pre_service_id: '43',
      post_service_id: '4',
      actions: [
        { vm_id: '1', pre_service: true, post_service: true },
        { vm_id: '2', pre_service: false, post_service: false },
        { vm_id: '3', pre_service: true, post_service: true }
      ]
    }
  },
  created_at: '2018-05-01T12:13:50Z',
  id: '1',
  miq_requests: [
    {
      href: 'http://localhost:3000/api/service_requests/1',
      id: '1',
      description: 'Migration Plan',
      approval_state: 'approved',
      type: 'ServiceTemplateTransformationPlanRequest',
      created_on: '2018-04-06T12:31:30Z',
      updated_on: '2018-04-06T12:31:30Z',
      fulfilled_on: '2018-04-06T12:31:30Z',
      requester_id: '1',
      requester_name: 'Administrator',
      request_type: 'transformation_plan',
      request_state: 'active',
      message: 'Active = 2; Finished = 1',
      status: 'Ok',
      options: {
        dialog: null,
        workflow_settings: {
          resource_action_id: '4351'
        },
        initiator: null,
        src_id: '30',
        cart_state: 'ordered',
        requester_group: 'EvmGroup-super_administrator'
      },
      userid: 'admin',
      source_id: '1',
      source_type: 'ServiceTemplate',
      destination_id: null,
      destination_type: null,
      tenant_id: '1',
      service_order_id: '91',
      process: true
    }
  ]
};

export const requestWithTasks = {
  href: 'http://localhost:3000/api/service_requests/1',
  id: '1',
  description: 'Migration Plan',
  approval_state: 'approved',
  type: 'ServiceTemplateTransformationPlanRequest',
  created_on: '2018-04-06T12:31:30Z',
  updated_on: '2018-04-06T12:31:30Z',
  fulfilled_on: '2018-04-06T12:31:30Z',
  requester_id: '1',
  requester_name: 'Administrator',
  request_type: 'transformation_plan',
  request_state: 'finished',
  message: 'Active = 2; Finished = 1',
  miq_request_tasks: [
    {
      href: 'http://localhost:3000/api/request_tasks/1',
      id: '1',
      description: 'Transforming VM [brett-v2v-testing]',
      state: 'finished',
      request_type: 'transformation_plan',
      userid: 'admin',
      options: {
        dialog: null,
        workflow_settings: {
          resource_action_id: '11'
        },
        playbooks: {
          pre: {
            job_id: '43',
            job_status: 'complete'
          },
          post: {
            job_id: '4',
            job_status: 'running'
          }
        },
        initiator: null,
        src_id: '1',
        cart_state: 'ordered',
        requester_group: 'EvmGroup-super_administrator',
        delivered_on: '2018-05-04T19:03:21.606Z',
        progress: {
          current_description: 'Virtual machine migrated',
          current_state: '/State7',
          percent: 100,
          states: {
            '/State1': {
              status: 'finished',
              weight: 1,
              description: 'Assess Migration',
              message: 'State1 is finished.',
              started_on: '2018-05-04T19:03:26Z',
              percent: 100,
              updated_on: '2018-05-04T19:03:27Z'
            },
            '/State2': {
              status: 'finished',
              weight: 1,
              description: 'Acquire Transformation Host',
              message: 'State2 is finished.',
              started_on: '2018-05-04T19:03:27Z',
              percent: 100,
              updated_on: '2018-05-04T19:03:28Z'
            },
            '/State3': {
              status: 'finished',
              weight: 1,
              description: 'Power off',
              message: 'State3 is finished.',
              started_on: '2018-05-04T19:03:28Z',
              percent: 100,
              updated_on: '2018-05-04T19:03:29Z'
            },
            '/State4': {
              status: 'finished',
              weight: 1,
              description: 'Collapse Snapshots',
              message: 'State4 is finished.',
              started_on: '2018-05-04T19:03:29Z',
              percent: 100,
              updated_on: '2018-05-04T19:03:30Z'
            },
            '/State5': {
              status: 'finished',
              weight: 95,
              description: 'Transform VM',
              message: 'State5 is finished.',
              started_on: '2018-05-04T19:03:31Z',
              percent: 100,
              updated_on: '2018-05-04T19:13:53Z'
            },
            '/State5/State1': {
              status: 'finished',
              weight: 1,
              description: 'Convert disks',
              message: 'State1 is finished.',
              started_on: '2018-05-04T19:03:31Z',
              percent: 100,
              updated_on: '2018-05-04T19:03:33Z'
            },
            '/State5/State2': {
              status: 'finished',
              weight: 85,
              description: 'Convert disks',
              message: 'Disks transformation succeeded.',
              started_on: '2018-05-04T19:03:33Z',
              percent: 100,
              updated_on: '2018-05-04T19:12:00Z'
            },
            '/State5/State3': {
              status: 'finished',
              weight: 4,
              description: 'Refresh inventory',
              message: 'State3 is finished.',
              started_on: '2018-05-04T19:12:01Z',
              percent: 100,
              updated_on: '2018-05-04T19:12:23Z'
            },
            '/State5/State4': {
              status: 'finished',
              weight: 1,
              description: 'Update description of VM',
              message: 'State4 is finished.',
              started_on: '2018-05-04T19:12:23Z',
              percent: 100,
              updated_on: '2018-05-04T19:12:25Z'
            },
            '/State5/State5': {
              status: 'finished',
              weight: 1,
              description: 'Enable Virtio-SCSI for VM',
              message: 'State5 is finished.',
              started_on: '2018-05-04T19:12:25Z',
              percent: 100,
              updated_on: '2018-05-04T19:12:26Z'
            },
            '/State5/State6': {
              status: 'finished',
              weight: 1,
              description: 'Power-on VM',
              message: 'State6 is finished.',
              started_on: '2018-05-04T19:12:27Z',
              percent: 100,
              updated_on: '2018-05-04T19:12:28Z'
            },
            '/State5/State7': {
              status: 'finished',
              weight: 7,
              description: 'Power-on VM',
              message: 'State7 is finished.',
              started_on: '2018-05-04T19:12:28Z',
              percent: 100,
              updated_on: '2018-05-04T19:13:53Z'
            },
            '/State6': {
              status: 'finished',
              weight: 1,
              description: 'Mark source as migrated',
              message: 'exit',
              started_on: '2018-05-04T19:13:54Z',
              percent: 100,
              updated_on: '2018-05-04T19:13:55Z'
            },
            '/State7': {
              status: 'finished',
              weight: 1,
              description: 'Virtual machine migrated',
              message: 'Virtual machine migrated',
              started_on: '2018-05-04T19:13:55Z',
              percent: 0
            }
          }
        },
        virtv2v_networks: [
          {
            source: 'VM Network',
            destination: 'ovirtmgmt'
          }
        ],
        virtv2v_disks: [
          {
            path: '[iSCSI_Datastore] brett-v2v-testing/brett-v2v-testing.vmdk',
            size: 17179869184,
            percent: 100,
            weight: 100
          }
        ],
        collapse_snapshots: true,
        power_off: true,
        transformation_host_id: '2',
        transformation_host_name: 'rhelh09.v2v.bos.redhat.com',
        export_domain_id: '1',
        virtv2v_wrapper: {
          wrapper_log: '/var/log/vdsm/import/v2v-import-20180504T150334-104409-wrapper.log',
          v2v_log: '/var/log/vdsm/import/v2v-import-20180504T150334-104409.log',
          state_file: '/tmp/v2v-import-20180504T150334-104409.state'
        },
        virtv2v_started_on: '2018-05-04 15:03:32',
        virtv2v_status: 'active',
        virtv2v_finished_on: '20180504_1512',
        destination_vm_id: '98'
      },
      created_on: '2018-05-04T19:03:21Z',
      updated_on: '2018-05-04T19:13:55Z',
      message: 'Post-migration',
      status: 'Ok',
      type: 'ServiceTemplateTransformationPlanTask',
      miq_request_id: '1',
      source_id: '1',
      source_type: 'VmOrTemplate',
      destination_id: null,
      destination_type: null,
      miq_request_task_id: null,
      phase: null,
      phase_context: {},
      tenant_id: '1'
    },
    {
      href: 'http://localhost:3000/api/request_tasks/2',
      id: '2',
      description: 'Transforming VM [Database-01]',
      state: 'active',
      request_type: 'transformation_plan',
      userid: 'admin',
      options: {
        dialog: null,
        workflow_settings: {
          resource_action_id: '32'
        },
        playbooks: {},
        initiator: null,
        src_id: '1',
        cart_state: 'ordered',
        requester_group: 'EvmGroup-super_administrator',
        delivered_on: '2018-05-07T20:07:29.537Z',
        progress: {
          current_state: '/State3',
          current_description: 'Power off',
          percent: null,
          states: {
            '/State1': {
              status: 'finished',
              weight: 1,
              description: 'Assess Migration',
              message: 'State1 is finished.',
              started_on: '2018-05-07T20:07:36Z',
              percent: 100,
              updated_on: '2018-05-07T20:07:38Z'
            },
            '/State2': {
              status: 'finished',
              weight: 1,
              description: 'Acquire Transformation Host',
              message: 'State2 is finished.',
              started_on: '2018-05-07T20:07:39Z',
              percent: 100,
              updated_on: '2018-05-07T20:07:43Z'
            },
            '/State3': {
              status: 'active',
              weight: 1,
              description: 'Power off',
              message: 'State3 is not finished yet [354/0 retries].',
              started_on: '2018-05-07T20:07:44Z',
              percent: null,
              updated_on: '2018-05-09T00:21:38Z'
            }
          }
        },
        virtv2v_networks: [
          {
            source: 'VM Network',
            destination: 'ovirtmgmt'
          }
        ],
        virtv2v_disks: [
          {
            path: '[datastore12] database-01/database-01.vmdk',
            size: 17179869184,
            percent: 45,
            weight: 100
          }
        ],
        collapse_snapshots: true,
        power_off: true,
        transformation_host_id: '1',
        transformation_host_name: 'rhelh08.v2v.bos.redhat.com'
      },
      created_on: '2018-05-07T20:07:33Z',
      updated_on: '2018-05-09T00:21:38Z',
      message: 'Convert Disks',
      status: 'Ok',
      type: 'ServiceTemplateTransformationPlanTask',
      miq_request_id: '1',
      source_id: '2',
      source_type: 'VmOrTemplate',
      destination_id: null,
      destination_type: null,
      miq_request_task_id: null,
      phase: null,
      phase_context: {},
      tenant_id: '1'
    },
    {
      href: 'http://localhost:3000/api/request_tasks/3',
      id: '3',
      description: 'Transforming VM [Database-01]',
      state: 'active',
      request_type: 'transformation_plan',
      userid: 'admin',
      options: {
        dialog: null,
        workflow_settings: {
          resource_action_id: '32'
        },
        playbooks: {
          pre: {
            job_id: '43',
            job_status: 'running'
          },
          post: {
            job_id: '4',
            job_status: '<PLAYBOOK_RUN_PENDING>'
          }
        },
        initiator: null,
        src_id: '1',
        cart_state: 'ordered',
        requester_group: 'EvmGroup-super_administrator',
        delivered_on: '2018-05-07T20:07:29.537Z',
        progress: {
          current_state: '/State3',
          current_description: '<PRE_MIGRATION_PLAYBOOK_DESCRIPTION>',
          percent: null,
          states: {
            '/State1': {
              status: 'finished',
              weight: 1,
              description: 'Assess Migration',
              message: 'State1 is finished.',
              started_on: '2018-05-07T20:07:36Z',
              percent: 100,
              updated_on: '2018-05-07T20:07:38Z'
            },
            '/State2': {
              status: 'finished',
              weight: 1,
              description: 'Acquire Transformation Host',
              message: 'State2 is finished.',
              started_on: '2018-05-07T20:07:39Z',
              percent: 100,
              updated_on: '2018-05-07T20:07:43Z'
            },
            '/State3': {
              status: 'active',
              weight: 1,
              description: '<PRE_MIGRATION_PLAYBOOK_DESCRIPTION>',
              message: 'State3 is not finished yet [354/0 retries].',
              started_on: '2018-05-07T20:07:44Z',
              percent: null,
              updated_on: '2018-05-09T00:21:38Z'
            }
          }
        },
        virtv2v_networks: [
          {
            source: 'VM Network',
            destination: 'ovirtmgmt'
          }
        ],
        virtv2v_disks: [
          {
            path: '[datastore12] database-01/database-01.vmdk',
            size: 17179869184,
            percent: 0,
            weight: 100
          }
        ],
        collapse_snapshots: true,
        power_off: true,
        transformation_host_id: '1',
        transformation_host_name: 'rhelh08.v2v.bos.redhat.com'
      },
      created_on: '2018-05-07T20:07:33Z',
      updated_on: '2018-05-09T00:21:38Z',
      message: 'Pre-migration',
      status: 'Ok',
      type: 'ServiceTemplateTransformationPlanTask',
      miq_request_id: '1',
      source_id: '3',
      source_type: 'VmOrTemplate',
      destination_id: null,
      destination_type: null,
      miq_request_task_id: null,
      phase: null,
      phase_context: {},
      tenant_id: '1'
    }
  ],
  status: 'Ok',
  options: {
    dialog: null,
    workflow_settings: {
      resource_action_id: '4351'
    },
    initiator: null,
    src_id: '30',
    cart_state: 'ordered',
    requester_group: 'EvmGroup-super_administrator'
  },
  userid: 'admin',
  source_id: '1',
  source_type: 'ServiceTemplate',
  destination_id: null,
  destination_type: null,
  tenant_id: '1',
  service_order_id: '91',
  process: true
};

export const preMigrationPlaybook = {
  href: 'http://localhost:3000/api/service_templates/43',
  id: '43',
  name: 'Ansible test',
  description: '',
  guid: '7de52447-2946-409d-8e76-b64d0f17803d',
  type: 'ServiceTemplateAnsiblePlaybook',
  service_template_id: null,
  options: {
    config_info: {
      provision: {
        repository_id: '23',
        playbook_id: '309',
        credential_id: '10',
        hosts: 'test_avaleror',
        verbosity: '1',
        log_output: 'on_error',
        extra_vars: {},
        execution_ttl: '5',
        become_enabled: false,
        cloud_credential_id: '124',
        new_dialog_name: 'demo_httpd',
        fqname: '/Service/Generic/StateMachines/GenericLifecycle/provision',
        dialog_id: '50'
      },
      retirement: {
        remove_resources: 'no_with_playbook',
        verbosity: '0',
        log_output: 'on_error',
        repository_id: '23',
        playbook_id: '305',
        credential_id: '10',
        execution_ttl: '',
        hosts: 'localhost',
        extra_vars: {},
        become_enabled: false,
        fqname: '/Service/Generic/StateMachines/GenericLifecycle/Retire_Advanced_Resource_None'
      }
    }
  },
  created_at: '2018-02-09T19:33:42Z',
  updated_at: '2018-02-11T12:31:20Z',
  display: true,
  evm_owner_id: null,
  miq_group_id: '39',
  service_type: 'atomic',
  prov_type: 'generic_ansible_playbook',
  provision_cost: null,
  service_template_catalog_id: '16',
  long_description: null,
  tenant_id: '1',
  generic_subtype: null,
  deleted_on: null
};

export const postMigrationPlaybook = {
  href: 'http://localhost:3000/api/service_templates/4',
  id: '4',
  name: 'MyPBaaS',
  description: 'My Playbook as a Service',
  guid: '66e68a63-31d0-4c9b-9ef2-6f7b31fb2431',
  type: 'ServiceTemplateAnsiblePlaybook',
  service_template_id: null,
  options: {
    config_info: {
      provision: {
        repository_id: '2',
        playbook_id: '25',
        credential_id: '10',
        hosts: 'localhost',
        verbosity: '0',
        extra_vars: {
          username: {
            default: 'none'
          }
        },
        execution_ttl: '10',
        become_enabled: false,
        new_dialog_name: 'MyPBaaSUserForm',
        fqname: '/Service/Generic/StateMachines/GenericLifecycle/provision',
        dialog_id: '9'
      },
      retirement: {
        remove_resources: 'yes_without_playbook',
        verbosity: '0',
        fqname: '/Service/Generic/StateMachines/GenericLifecycle/Retire_Basic_Resource'
      }
    }
  },
  created_at: '2017-10-16T07:21:07Z',
  updated_at: '2017-10-27T11:42:13Z',
  display: true,
  evm_owner_id: null,
  miq_group_id: '2',
  service_type: 'atomic',
  prov_type: 'generic_ansible_playbook',
  provision_cost: null,
  service_template_catalog_id: '3',
  long_description: null,
  tenant_id: '1',
  generic_subtype: null,
  deleted_on: null
};

export const playbooksStore = {
  [`/api/service_templates/${preMigrationPlaybook.id}`]: preMigrationPlaybook,
  [`/api/service_templates/${postMigrationPlaybook.id}`]: postMigrationPlaybook
};
