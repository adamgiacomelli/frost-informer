import React, {Component} from "react";
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
} from "reactstrap";


class Translations extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Translations
              </CardHeader>
              <CardBlock className="card-body">
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Domain</th>
                    <th>String Id</th>
                    <th>Translation</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Landing</td>
                    <td>landing.featuredArtistsLabel</td>
                    <td>
                      <Input type="text" id="text-input" name="text-input" placeholder="Featured Artists"/>
                      <FormText color="muted">This is a help text</FormText>                      
                    </td>
                  </tr>                 
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous href="#">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next href="#">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>

    )
  }
}

export default Translations;
