import React, { Component } from 'react';
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

class ReferralCodes extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Referral Codes
              </CardHeader>
              <CardBlock className="card-body">
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Test</td>
                      <td>Test2</td>
                      <td>Test3</td>
                    </tr>
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink previous href="#">
                        Prev
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next href="#">
                        Next
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ReferralCodes;
