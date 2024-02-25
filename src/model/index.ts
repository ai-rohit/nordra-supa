export interface OrderData {
  orderid: number;
  organizationlocation: string;
  organizationname: string;
  partnercontactnumber: string;
  partnerfirstname: string;
  partnerlastname: string;
  partnerlocation: string;
}

export enum HeaderKeys {
  OrderID = "orderid",
  PartnerName = "partnername",
  OrganizationName = "organizationname",
  OrganizationLocation = "organizationlocation",
  PartnerContactNumber = "partnercontactnumber",
}
