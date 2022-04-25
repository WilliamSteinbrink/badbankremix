import React from 'react';
import Card from 'react-bootstrap/Card';

function CardComp(props) {
  function background() {
    const bgc = props.bgcolor ? props.bgcolor : ' ';
    return bgc;
  }
  function textColor() {
    const txt = props.txtcolor ? props.txtcolor : 'white';
    return txt;
  }

  return (
    <Card className="mb-3" border="dark" bg={background()} text={textColor()} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Header>{props.header}</Card.Header>
        <Card.Text>
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CardComp;