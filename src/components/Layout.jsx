import React from "react";
import { Row, Col, Container, Table } from "reactstrap";

const Layout = ({ children, ...rest }) => {
  return (
    <Container>
      <Row className="justify-content-center align-items-center text-center">
        <Col sm="12" md="8" lg="6" {...rest}>
          <Table className="table-custom">
            <tbody>
              <tr>
                <td class="align-bottom">{children}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
