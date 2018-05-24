import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon, ListView, Grid, Modal } from 'patternfly-react';
import OverviewEmptyState from '../OverviewEmptyState/OverviewEmptyState';

function clusterCount(mapping, clusterType) {
  return [
    ...new Set(
      mapping
        .filter(item => item.destination_type.toLowerCase() === 'emscluster')
        .map(item => item[`${clusterType}`])
    )
  ].length;
}

function clusterName(clusters, clusterId) {
  return clusters.map(cluster => (
    <React.Fragment key={cluster.id}>
      {clusterId === cluster.id
        ? `${cluster.v_parent_datacenter} \\ ${cluster.name}`
        : null}
    </React.Fragment>
  ));
}

const InfrastructureMappingsList = ({
  clusters,
  transformationMappings,
  createInfraMappingClick,
  requestsInProgressMappings,
  // noPlanAssociationsMappings,
  // requestsCompletedSuccessfullyMappings,
  // notStartedPlansMappings,
  // requestsCompletedWithErrorsMappings,
  setMappingToDelete,
  showDeleteConfirmationModalAction,
  deleteInfraMappingAction,
  yesToDeleteMapping
}) => (
  <Grid.Col
    xs={12}
    style={{
      paddingBottom: 100,
      height: '100%'
    }}
  >
    {transformationMappings.length > 0 ? (
      <React.Fragment>
        <div className="heading-with-link-container">
          <div className="pull-left">
            <h3>{__('Infrastructure Mappings')}</h3>
          </div>
          <div className="pull-right">
            {/** todo: create IconLink in patternfly-react * */}
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                createInfraMappingClick();
              }}
            >
              <Icon type="pf" name="add-circle-o" />
              &nbsp;{__('Create Infrastructure Mapping')}
            </a>
          </div>
        </div>

        <ListView style={{ marginTop: 10 }}>
          {transformationMappings.map(mapping => (
            <ListView.Item
              key={mapping.id}
              heading={mapping.name}
              description={mapping.description}
              additionalInfo={[
                <ListView.InfoItem key={0}>
                  <Icon type="pf" name="cluster" />
                  <strong>
                    {clusterCount(
                      mapping.transformation_mapping_items,
                      'source_id'
                    )}
                  </strong>&nbsp;{__('Source Clusters')}
                </ListView.InfoItem>,
                <ListView.InfoItem key={1}>
                  <Icon type="pf" name="cluster" />
                  <strong>
                    {clusterCount(
                      mapping.transformation_mapping_items,
                      'destination_id'
                    )}
                  </strong>&nbsp;{__('Target Clusters')}
                </ListView.InfoItem>,
                <ListView.InfoItem key={2}>
                  {requestsInProgressMappings.find(
                    request => request === mapping.id
                  ) ? (
                    <Icon
                      className="delete-infra-mapping-icon-disabled"
                      type="pf"
                      name="delete"
                    />
                  ) : (
                    <Icon
                      type="pf"
                      name="delete"
                      onClick={e => {
                        // e.preventDefault();
                        // alert('hi');
                        // deleteInfraMapping(mapping);
                        // deleteConfirmModal();
                        // deleteConfirmationModalAction(true);
                        setMappingToDelete(mapping);
                        showDeleteConfirmationModalAction();
                        // showDeleteConfirmationModalAction().then(() => {
                        //   const { yesToDeleteMapping } = this.props;
                        //   if (yesToDeleteMapping) {
                        //     deleteInfraMappingAction(mapping);
                        //   }
                        // });
                      }}
                    />
                  )}
                </ListView.InfoItem>
              ]}
            >
              <Grid.Row
                style={{
                  paddingBottom: 14
                }}
              >
                <Grid.Col sm={12}>
                  {__('Completed: ')}
                  {moment(mapping.created_at).format('MMMM Do YYYY, h:mm a')}
                </Grid.Col>
              </Grid.Row>
              <Grid.Row>
                <Grid.Col sm={4}>
                  <b>{__('Source Clusters')}</b>
                </Grid.Col>
                <Grid.Col sm={4}>
                  <b>{__('Target Clusters')}</b>
                </Grid.Col>
                <Grid.Col smOffset={4} />
              </Grid.Row>
              <Grid.Row />
              {mapping.transformation_mapping_items
                .filter(item => item.source_type.toLowerCase() === 'emscluster')
                .map((item, i) => (
                  <React.Fragment key={`${i}-${item.id}`}>
                    <Grid.Row>
                      <Grid.Col sm={4}>
                        {clusterName(clusters, item.source_id)}
                      </Grid.Col>
                      <Grid.Col sm={4}>
                        {clusterName(clusters, item.destination_id)}
                      </Grid.Col>
                      <Grid.Col smOffset={4} />
                    </Grid.Row>
                  </React.Fragment>
                ))}
            </ListView.Item>
          ))}
        </ListView>
      </React.Fragment>
    ) : (
      <OverviewEmptyState
        showWizardAction={createInfraMappingClick}
        description="Create an infrastructure mapping to later be used by a migration plan."
        buttonText="Create Infrastructure Mapping"
      />
    )}
  </Grid.Col>
);

InfrastructureMappingsList.propTypes = {
  clusters: PropTypes.array,
  transformationMappings: PropTypes.array,
  createInfraMappingClick: PropTypes.func,
  requestsInProgressMappings: PropTypes.array,
  noPlanAssociationsMappings: PropTypes.array,
  requestsCompletedSuccessfullyMappings: PropTypes.array,
  notStartedPlansMappings: PropTypes.array,
  requestsCompletedWithErrorsMappings: PropTypes.array,
  setMappingToDelete: PropTypes.func,
  showDeleteConfirmationModalAction: PropTypes.func,
  deleteInfraMappingAction: PropTypes.func,
  yesToDeleteMapping: PropTypes.bool
};

export default InfrastructureMappingsList;
