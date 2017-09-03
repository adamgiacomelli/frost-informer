import React, { Component } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBlock,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table
} from 'reactstrap'

import TempChart from '../../components/TempChart/'

import { inject, observer } from 'mobx-react'



const Dashboard = inject('store')(
  observer(({ store: { apiStore: { apiTemperaturesStore } } }) => {
    if (!apiTemperaturesStore) {
      return null
    }
  
    return (
      <div className='animated fadeIn'>
        <Row>
          <Col>
            <Card>
              <CardBlock className='card-body'>
                <Row>
                  <Col sm='5'>
                    <CardTitle className='mb-0'>Temperatures</CardTitle>
                  </Col>
                  <Col sm='7' className='d-none d-sm-inline-block'>
                    <Button color='primary' className='float-right'>
                      <i className='icon-cloud-download' />
                    </Button>
                  </Col>
                </Row>
                 <TempChart />
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    )
  })
)

export default Dashboard
