import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Select, Form, Row, Col } from "antd";
import "./index.scss";
import SearchCT from "../SearchCT";
import Description from "../Description";
import moment from "moment";

const { Option } = Select;

Covid19.propTypes = {};

function Covid19(props) {
  const [covid, setCovid] = useState([]);
  const [data, setData] = useState(covid);
  // setData(covid);
  // console.log("data first", covid);
  // console.log("data", data);
  const [infected, setInfected] = useState("");
  useEffect(async () => {
    const api = await axios(
      "https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true"
    )
      .then((res) => {
        // console.log("res data", res.data);
        setCovid(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
    // setData(api);
  }, []);
  // console.log("data", data);

  const columns = [];
  const colm = data[0];
  const colSourceAPI = () => {
    if (colm) {
      // console.log("colm", colm);
      for (let i in colm) {
        if (i.toLowerCase() === "moredata") {
          // console.log("")
        } else if (i.toLowerCase() === "historydata") {
        } else if (i.toLowerCase() === "sourceurl") {
          // columns.push({
          //   title: "",
          //   // i.charAt(0).toUpperCase() + i.slice(1),
          //   dataIndex: "",
          //  key: "",
          // });
        } else if (i.toLowerCase() === "lastupdatedsource") {
        } else if (i.toLowerCase() === "lastupdatedapify") {
          columns.push({
            title: i.charAt(0).toUpperCase() + i.slice(1),
            dataIndex: i,
            key: i,
          });
        } else
          columns.push({
            title: i.charAt(0).toUpperCase() + i.slice(1),
            dataIndex: i,
            key: i,
          });
      }
      // console.log("columns", columns);
      return columns;
    }
  };

  function sorted(value, name) {
    if (name === "country") {
      if (value === "increase") {
        const infected = [...covid];
        setData(
          infected.sort((a, b) => {
            if (a.country < b.country) return -1;
            else if (a.country > b.country) return 1;
            return 0;
          })
        );
      } else {
        const infected = [...covid];
        setData(
          infected.sort((a, b) => {
            if (a.country > b.country) return -1;
            else if (a.country < b.country) return 1;
            return 0;
          })
        );
      }
      return;
    }
    if (name === "tested") {
      let num = [];
      let char = [];
      const infected = [...covid];
      infected.forEach((a) => {
        if (typeof a.tested == "number") num.push(a);
        else char.push(a);
      });
      // let sortt = num.sort((a,b) => a.tested -b.tested)
      if (value === "increase") {
        let sortt = num.sort((a, b) => a.tested - b.tested).concat(char);
        // const infected = [...covid];
        setData(sortt);
      } else {
        let sortt = num.sort((a, b) => b.tested - a.tested).concat(char);
        // const infected = [...covid];
        setData(sortt);
      }
      return;
    }

    if (name === "recovered") {
      let num = [];
      let char = [];
      const infected = [...covid];
      infected.forEach((a) => {
        if (typeof a.recovered == "number") num.push(a);
        else char.push(a);
      });
      // let sortt = num.sort((a,b) => a.tested -b.tested)
      if (value === "increase") {
        let sortt = num.sort((a, b) => a.recovered - b.recovered).concat(char);
        // console.log("sror",sortt);
        setData(sortt);
      } else {
        let sortt = num.sort((a, b) => b.recovered - a.recovered).concat(char);
        const infected = [...covid];
        setData(sortt);
      }
      return;
    }

    if (value === "increase") {
      const infected = [...covid];
      infected.sort((a, b) => a[name] - b[name]);
      setData(infected);
    } else {
      const infected = [...covid];
      infected.sort((a, b) => b[name] - a[name]);
      setData(infected);
    }
  }
  const sortByInfected = (value) => {
    sorted(value, "infected");
  };

  const sortByTested = (value) => {
    sorted(value, "tested");
  };

  const sortByRecovered = (value) => {
    sorted(value, "recovered");
  };

  const sortByDeceased = (value) => {
    sorted(value, "deceased");
  };

  const sortByCountry = (value) => {
    sorted(value, "country");
  };

  const handleSubmitSearch = (country) => {
    const searchCt = [...covid];
    if (country.q === "") {
      console.log("ádasd");
      setData(searchCt);
      return;
    }

    const result = searchCt.filter(
      (ct) => ct.country.toLowerCase().includes(country.q.toLowerCase())
      // ct.country.toLowerCase() === country.q.toLowerCase()
    );
    // console.log(result);
    setData(result);
  };

  const show = (value) => {
    const result = covid
      .map((c) => c[value])
      .reduce(function (a, b) {
        if (b === "NA") b = 0;
        return a + b;
      }, 0);
    // console.log("dapan", result);
    return result;
  };

  const infec = show("infected");
  const tested = show("tested");
  const recovered = show("recovered");
  const deceased = show("deceased");
  const [convertData, setConvertData] = useState(null);

  useEffect(() => {
    setConvertData((cur) => {
      return data.map((date) => {
        let tamp = { ...date };
        tamp.lastUpdatedApify = moment(
          moment(date.lastUpdatedApify)._d
        ).fromNow();
        return tamp;
      });
    });
  }, [data]);

  return (
    <div className="container">
      <div className="header">Covid Data Tracker</div>
      <Row className="main">
        <Col style={{ width: "min-content" }}>
          <Row>
            <Col>
              <SearchCT onSubmit={handleSubmitSearch} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="control__bar">
                <div className="titile__sort">Sort by:</div>
                <Form.Item name="infected" label="Infected">
                  <Select
                    placeholder="Infected"
                    onChange={sortByInfected}
                    allowClear
                    value={infected}
                  >
                    <Option value="increase">Low</Option>
                    <Option value="decrease">High</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="tested" label="Tested">
                  <Select
                    placeholder="Tested"
                    onChange={sortByTested}
                    allowClear
                    value={infected}
                  >
                    <Option value="increase">Low</Option>
                    <Option value="decrease">High</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="tested" label="Recovered">
                  <Select
                    placeholder="Recovered"
                    onChange={sortByRecovered}
                    allowClear
                    value={infected}
                  >
                    <Option value="increase">Low</Option>
                    <Option value="decrease">High</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="tested" label="Deceased">
                  <Select
                    placeholder="Deceased"
                    onChange={sortByDeceased}
                    allowClear
                    value={infected}
                  >
                    <Option value="increase">Low</Option>
                    <Option value="decrease">High</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="country" label="Country">
                  <Select
                    placeholder="Country"
                    onChange={sortByCountry}
                    allowClear
                    value={infected}
                  >
                    <Option value="increase">A-Z</Option>
                    <Option value="decrease">Z-A</Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Col>
        <Col>
          <Description
            infected={infec}
            tested={tested}
            recovered={recovered}
            deceased={deceased}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          {/* cai dau ? nghia la sao bua thang quang co keutuibay coi ma chua coi ak. tuc la khi gia tri la truthy thì mới . tiếp còn faslthy thì ObKo OK roi */}
          {convertData?.length < 1 && (
            <div className="not__found">Not found</div>
          )}
          {convertData?.length > 0 && (
            <Table
              columns={colSourceAPI()}
              dataSource={convertData}
              className="table"
            />
          )}
        </Col>
      </Row>
    </div>
    // </Row>
  );
}

export default Covid19;
