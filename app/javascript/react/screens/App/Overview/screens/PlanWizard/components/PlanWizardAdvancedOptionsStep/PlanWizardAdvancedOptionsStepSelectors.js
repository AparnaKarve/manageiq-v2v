export const getVMStepSelectedVms = (valid_vms, selectedVms) => valid_vms.filter(vm => selectedVms.includes(vm.id));
