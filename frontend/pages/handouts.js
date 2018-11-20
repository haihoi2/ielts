/* /pages/Handouts.js */
import gql from "graphql-tag";
import { withRouter } from "next/router";
import { graphql } from "react-apollo";
import { compose } from "recompose";

import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row
} from "reactstrap";

class Handouts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data: { loading, error, handout },
      router,
      context,
      isAuthenticated
    } = this.props;
    if (error) return "Error Loading Review Record";

    if (handout) {
      return (
        <>
          <h1>{handout.name}</h1>
          <Row>
            <Col xs="9" style={{ padding: 0 }}>
              <div style={{ display: "inline-block" }} className="h-100">
                {handout.rhrs.map(res => (
                  <Card
                    style={{ width: "100%", margin: "0 10px" }}
                    key={res._id}
                  >
                    {/* <CardImg
                      top={true}
                      style={{ height: 250 }}
                      src={`http://localhost:1337${res.image &&res.image.url}`}
                    /> */}
                    <CardBody>
                      <CardTitle>{res.Title}</CardTitle>
                      <CardText>{res.Content}</CardText>
                    </CardBody>
                    <div className="card-footer">
                      <Button outline color="primary">
                        + View Review
                      </Button>

                      <style jsx>
                        {`
                          a {
                            color: white;
                          }
                          a:link {
                            text-decoration: none;
                            color: white;
                          }
                          .container-fluid {
                            margin-bottom: 30px;
                          }
                          .btn-outline-primary {
                            color: #007bff !important;
                          }
                          a:hover {
                            color: white !important;
                          }
                        `}
                      </style>
                    </div>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </>
      );
    }
    return <h1>Loading</h1>;
  }
}

const GET_HANDOUT_RHRS = gql`
  query($id: ID!) {
    handout(id: $id) {
      _id
      Title
      rhrs {
        _id
        Title
        Content
        Grade
      }
    }
  }
`;
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (handoutList)

export default compose(
  withRouter,
  graphql(GET_HANDOUT_RHRS, {
    options: props => {
      return {
        variables: {
          id: props.router.query.id
        }
      };
    },
    props: ({ data }) => ({ data })
  })
)(Handouts);