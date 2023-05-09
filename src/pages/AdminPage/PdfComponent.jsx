import React, { useState } from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";

const PdfComponent = ({data,action}) => {

  const [people, setPeople] = useState(data);

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [["DATE", "COUNT"]];

    const data = people.map(elt=> [elt.date, elt.count]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  };

  return (
    <div>
      <button onClick={exportPDF}><p className='text-white font-light r'>Generate {action}</p> </button>
    </div>
  );
};

export default PdfComponent;