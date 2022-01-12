import React from 'react'
import { Card, Button } from 'react-bootstrap'
export default function Order() {
    return (
        <div>
            {[0, 1, 2].map((ele, index) =>
                <Card key={index} style={{}}>
                    <Card.Body>
                        <Card.Title><b style={{ color: "orange" }}>TRANSIT</b> Order By:{ }</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Placed on :{ }</Card.Subtitle>
                        <hr />
                        <Card.Text>
                            <img width="150px" height="auto" src="https://media.istockphoto.com/photos/old-wooden-chair-picture-id1288259097?b=1&k=20&m=1288259097&s=170667a&w=0&h=J6H9f5HTSNxxlf5ffiRpYZWQakQENYWXmUhg8XaBjBk=" />
                        </Card.Text>
                        <hr /><br />
                        <Button variant="primary">Download Invoice as PDF</Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}
