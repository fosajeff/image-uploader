import React from "react";
import { Row, Col, Container, Table, Card, CardBody } from "reactstrap";

const Layout = ({ children, ...rest }) => {
  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col sm="12" md="8" lg="6" {...rest}>
          <Table className="table-custom">
            <tbody>
              <tr>
                <td className="align-bottom">
                  <Card body className="p-sm-4 p-3">
                    <CardBody>{children}</CardBody>
                  </Card>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
