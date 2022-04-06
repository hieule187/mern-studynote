import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ActionButtons from './ActionButtons';

const SinglePost = ({ post: { _id, status, title, url, description } }) => {
  return (
    <Card
      className="shadow"
      border={
        status === 'LEARNED'
          ? 'success'
          : status === 'LEARNING'
          ? 'warning'
          : 'info'
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill
                variant={
                  status === 'LEARNED'
                    ? 'success'
                    : status === 'LEARNING'
                    ? 'warning'
                    : 'info'
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButtons url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
