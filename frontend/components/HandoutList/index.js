/* components/HandoutList/index.js */
import gql from "graphql-tag";
import Link from "next/link";
import { graphql } from "react-apollo";
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle
} from "reactstrap";
import { CardText, CardTitle, Col, Row } from "reactstrap";

const HandoutList = (
  { data: { loading, error, handouts }, search },
  req
) => {
  if (error) return "Error loading handouts";
  //if handouts are returned from the GraphQL query, run the filter query
  //and set equal to variable handoutsearch

  if (handouts && handouts.length) {
    //searchQuery
    const searchQuery = handouts.filter(query =>
      query.Title.toLowerCase().includes(search)
    );
    if (searchQuery.length != 0) {
      return (
        <div>
          <div className="h-100">
            {searchQuery.map(res => (
              <Card
                style={{ width: "45%", margin: "10px 10px" }}
                className="h-100"
                key={res._id}
              >
                {/* <CardImg
                  top={true}
                  style={{ height: 250 }}
                  
                  src={`http://localhost:1337${res.image && res.image.url}`}
                /> */}
                <CardBody>
                  <CardTitle>{res.Title}</CardTitle>
                  <CardText>{res.Content}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/handouts/${res._id}`}
                    href={`/handouts?id=${res._id}`}
                  >
                    <a className="btn btn-primary">View</a>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </div>
      );
    } else {
      return <h1>No handouts Found</h1>;
    }
  }
  return <h1>Loading</h1>;
};

const query = gql`
  {
    handouts {
      _id
      Title
      Content
      Image {
        url
      }
    }
  }
`;
HandoutList.getInitialProps = async ({ req }) => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (HandoutList)
export default graphql(query, {
  props: ({ data }) => ({
    data
  })
})(HandoutList);