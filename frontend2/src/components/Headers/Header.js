/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {useState, useEffect} from 'react';

const Header = (props) => {

  const [data, setData] = useState([]);
  const [todayStat, setTodayStat] = useState(0);
  const [yesterdayStat, setYesterdayStat] = useState(0);
  const [monthStat, setMonthStat] = useState(0);
  const [lastMonthStat, setLastMonthStat] = useState(0);
  const [urlId, setUrlId] = useState(props.id);

  useEffect(() => {
    fetch(`https://api.akisyah.my/parcel/getParcel/${urlId}`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error))
  }, [])

  const date = new Date();
  const today = date.getDate();
  const yesterday = date.getDate() - 1;
  const month = date.getMonth() + 1;
  const lastMonth = date.getMonth();

  const todayParcel = () => {
    console.log(data);
    let count = 0;
    data.map((item) => {
      const parcelDate = item.Date.split(".");
      console.log(parcelDate[0] + " " + parcelDate[1] + " " + parcelDate[2]);
      if (parcelDate[0] == today && parcelDate[1] == month) {
        count++;
      }
    })
    setTodayStat(count);
  }

  const yesterdayParcel = () => {
    let count = 0;
    data.map((item) => {
      const parcelDate = item.Date.split(".");
      console.log(parcelDate[0] + " " + parcelDate[1] + " " + parcelDate[2]);
      if (parcelDate[0] == yesterday && parcelDate[1] == month) {
        count++;
      }
    })
    setYesterdayStat(count);
  }

  const monthParcel = () => {
    let count = 0;
    data.map((item) => {
      const parcelDate = item.Date.split(".");
      console.log(parcelDate[0] + " " + parcelDate[1] + " " + parcelDate[2]);
      if (parcelDate[1] == month) {
        count++;
      }
    })
    setMonthStat(count);
  }

  const lastMonthParcel = () => {
    let count = 0;
    data.map((item) => {
      const parcelDate = item.Date.split(".");
      console.log(parcelDate[0] + " " + parcelDate[1] + " " + parcelDate[2]);
      if (parcelDate[1] == lastMonth) {
        count++;
      }
    })
    setLastMonthStat(count);
  }


  useEffect(() => {
    todayParcel();
    yesterdayParcel();
    monthParcel();
    lastMonthParcel();
  }, [data])

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Today's Parcel
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {todayStat}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
  <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
</svg>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Yesterday's Parcel
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{yesterdayStat}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
  <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
</svg>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          This Month's Parcel
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{monthStat}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
  <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
</svg>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Last Month Parcel
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{lastMonthStat}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
  <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
</svg>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
