import React from 'react'
import { Row, Col, Card, CardBlock, CardTitle, Button } from 'reactstrap'

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
                    <CardTitle className='mb-0'>Spalnica</CardTitle>
                  </Col>
                  <Col sm='7' className='d-none d-sm-inline-block'>
                    <Button color='primary' className='float-right'>
                      <i className='icon-cloud-download' />
                    </Button>
                  </Col>
                </Row>
                {apiTemperaturesStore.temperatures.length > 0 && (
                  <TempChart
                    series={apiTemperaturesStore.temperatures.toJS()}
                    range={[
                      parseInt(
                        ((new Date().getTime() - 60*60*24*1000) / 1000).toFixed(0)
                      ),
                      parseInt((new Date().getTime() / 1000).toFixed(0))
                    ]}
                  />
                )}
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    )
  })
)

export default Dashboard
