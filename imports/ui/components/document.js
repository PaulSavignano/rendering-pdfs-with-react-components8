import React from 'react'
import { base64ToBlob } from '../../modules/base64-to-blob'
import fileSaver from 'file-saver'
import InlineCss from 'react-inline-css'
import { Button, ListGroupItem } from 'react-bootstrap'
import { Meteor } from 'meteor/meteor'
import { Bert } from 'meteor/themeteorchef:bert'

const downloadPDF = (event) => {
  event.preventDefault()
  const { target } = event
  const documentId = target.getAttribute('data-id')
  target.innerHTML = '<em>Downloading...</em>'
  target.classList.add('downloading')
  Meteor.call('documents.download', { documentId }, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger')
    } else {
      const blob = base64ToBlob(response.fileName)
      fileSaver.saveAs(blob, response.fileName)
      target.innerHTML = "Download"
      target.classList.remove('downloading')
    }
  })
}

export const Document = ({ document }) => (
  <InlineCss stylsheet={`
    .Document {
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    }
    @media print {
    .Document {
    display: block;
    border: 1px solid red;
    padding: 20px;
    }
    .btn { display: none }
    hr { display: none }
    h3 {
    font-size: 28px;
    margin-top: 0px;
    margin-bottom: 0px;
    }
    p {
    margin-top: 10px;
    margin-bottom: 0px;
    font-size: 18px;
      }
    }
  `}>
    <ListGroupItem className="Document">
      <Button data-id={ document._id } onClick={ downloadPDF } bsStyle="success">Download</Button>
      <Button data-id={ document._id } onClick={ removeDocument } bsStyle="danger">Remove</Button>
      <hr/>
      <h3>{ document.title }</h3>
      <p>{ document.body }</p>
    </ListGroupItem>
  </InlineCss>
)

Document.propTypes = {
  docuemnt: React.PropTypes.object.isRequired,
}
