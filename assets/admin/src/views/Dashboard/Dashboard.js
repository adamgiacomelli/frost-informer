import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  Table,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  FormText
} from 'reactstrap';

const Dashboard = inject('store')(
  observer(({ store: { apiStore: { apiCodeshipStore } } }) => {
    if (!apiCodeshipStore) {
      return null;
    }

    let codeshipBuildData = apiCodeshipStore.codeshipBuilds.map(build =>
      <tr>
        <td>
          {build.id}
        </td>
        <td>
          {build.status}
        </td>
      </tr>
    );

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Last 10 Builds
              </CardHeader>
              <CardBlock className="card-body">
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {codeshipBuildData}
                  </tbody>
                </Table>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    );
  })
);

export default Dashboard;
