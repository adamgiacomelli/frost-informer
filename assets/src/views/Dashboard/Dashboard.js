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

import { inject, observer } from 'mobx-react'

const brandPrimary = '#20a8d8'
const brandSuccess = '#4dbd74'
const brandInfo = '#63c2de'
const brandWarning = '#f8cb00'
const brandDanger = '#f86c6b'

// Main Chart

// convert Hex to RGBA
function convertHex (hex, opacity) {
  hex = hex.replace('#', '')
  var r = parseInt(hex.substring(0, 2), 16)
  var g = parseInt(hex.substring(2, 4), 16)
  var b = parseInt(hex.substring(4, 6), 16)

  var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')'
  return result
}

// Random Numbers
function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const Dashboard = inject('store')(
  observer(({ store: { apiStore: { apiTemperaturesStore } } }) => {
    if (!apiTemperaturesStore) {
      return null
    }

    const mainChart = {
      labels: [],
      datasets: [
        {
          label: 'Temperatures',
          backgroundColor: convertHex(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: apiTemperaturesStore.temperatures
        }
      ]
    }

    const mainChartOpts = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(120 / 6),
              max: 120
            }
          }
        ]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
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
                    <ButtonToolbar
                      className='float-right'
                      aria-label='Toolbar with button groups'
                    >
                      <ButtonGroup
                        className='mr-3'
                        data-toggle='buttons'
                        aria-label='First group'
                      >
                        <Label
                          htmlFor='option1'
                          className='btn btn-outline-secondary'
                        >
                          <Input type='radio' name='options' id='option1' /> Day
                        </Label>
                        <Label
                          htmlFor='option2'
                          className='btn btn-outline-secondary active'
                        >
                          <Input
                            type='radio'
                            name='options'
                            id='option2'
                            defaultChecked
                          />{' '}
                          Month
                        </Label>
                        <Label
                          htmlFor='option3'
                          className='btn btn-outline-secondary'
                        >
                          <Input
                            type='radio'
                            name='options'
                            id='option3'
                          />{' '}
                          Year
                        </Label>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div
                  className='chart-wrapper'
                  style={{ height: 300 + 'px', marginTop: 40 + 'px' }}
                >
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    )
  })
)

export default Dashboard
