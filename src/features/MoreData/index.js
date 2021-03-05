// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table } from "antd";

// MoreData.propTypes = {};

// function MoreData(props) {
//   const {url} = props;
//   console.log("ủlllll",url)

//   const [more, setMore] = useState("");
//   useEffect(async () => {
//     const api = await axios(
//       "https://api.apify.com/v2/key-value-stores/pp4Wo2slUJ78ZnaAi/records/LATEST?disableRedirect=true"
//     )
//       .then((res) => {
//         // console.log(res.data);
//         setMore([res.data]);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const columns = [];
//   // const colm = more;
//   // console.log("mor", more);
//   const colSourceAPI = () => {
//     Object.entries(more).forEach(([key, value]) => {
//       columns.push({
//         title: key.charAt(0).toUpperCase() + key.slice(1),
//         dataIndex: key,
//         key: key,
//       });
//       console.log(columns);
//     });
//     return columns;
//   };

//   return (
//     <div>
//       <Table columns={colSourceAPI()} dataSource={more} className="table" />
//     </div>
//   );
// }

// export default MoreData;
