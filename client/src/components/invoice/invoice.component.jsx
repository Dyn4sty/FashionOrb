import React from "react";
import Orb from "../../assets/Orb.svg";
import "./Invoice.css";
import { Image } from "react-bootstrap";

const Invoice = ({ items, total }) => {
  const Shipping = 3.21;
  const TAX = 5.82;
  const invoiceId = 1;
  const date = new Date();
  return (
    <div class="container">
      <div class="invoice-react row">
        <div class="mb-4 col-12">
          <div class="mb-5 invoice-contents card">
            <div class="d-flex flex-column justify-content-between card-body">
              <div class="d-flex flex-column">
                <div class="d-flex flex-row justify-content-between pt-2 pb-2">
                  <div class="d-flex align-self-center">
                    <Image
                      className="img-fluid"
                      width="100"
                      src={Orb}
                      alt="Logo"
                    />
                  </div>
                  <div class="d-flex text-right align-self-center">
                    <p class="text-small text-semi-muted mb-0">
                      <span style={{ fontWeight: "500", fontSize: "1rem" }}>
                        FashionOrb
                      </span>{" "}
                      <br />
                      St. Bloomsburg London,UK
                      <br />
                      784 451 12 47
                    </p>
                  </div>
                </div>
                <div class="border-bottom pt-4 mb-5"></div>
                <div class="d-flex flex-row justify-content-between mb-5">
                  <div class="d-flex flex-column w-70 mr-2 p-4 text-semi-muted bg-semi-muted">
                    <p class="mb-0">Latashia Nagy</p>
                    <p class="mb-0">100-148 Warwick Trfy, Kansas City, USA</p>
                  </div>
                  <div class="d-flex w-30 flex-column text-right p-4 text-semi-muted bg-semi-muted">
                    <p class="mb-0">Invoice #: {invoiceId}</p>
                    <p class="mb-0">{date.toUTCString()}</p>
                  </div>
                </div>
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th class="text-muted text-extra-small mb-2">
                        ITEM NAME
                      </th>
                      <th class="text-muted text-extra-small mb-2">COUNT</th>
                      <th class="text-right text-muted text-extra-small mb-2">
                        PRICE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(({ imageUrl, price, name, quantity }) => (
                      <tr>
                        <td>{name}</td>
                        <td>{quantity} pcs</td>
                        <td class="text-right">$ {price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div class="d-flex flex-column">
                <div class="border-bottom pt-3 mb-5"></div>
                <table class="d-flex justify-content-end table table-borderless">
                  <tbody>
                    <tr>
                      <td class="text-semi-muted">Subtotal :</td>
                      <td class="text-right">$ {total}</td>
                    </tr>
                    <tr>
                      <td class="text-semi-muted">Tax :</td>
                      <td class="text-right">$ {TAX}</td>
                    </tr>
                    <tr>
                      <td class="text-semi-muted">Shipping :</td>
                      <td class="text-right">$ {Shipping}</td>
                    </tr>
                    <tr class="font-weight-bold">
                      <td class="text-semi-muted">Total :</td>
                      <td class="text-right">
                        $ {Math.round((total + Shipping + TAX) * 10000) / 10000}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="border-bottom pt-3 mb-5"></div>
                <p class="text-muted text-small text-center">
                  Invoice was created on a computer and is valid without the
                  signature and seal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
