import { type } from "os";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string
}

export type ticketsType = {
  id: number,
  name: string,
  price: number,
  isRemote: boolean,
  includesHotel: boolean,
  createdAt: Date,
  updatedAt: Date,
}

export type Payments = {
  id: number,
  ticketId: number,
  value: number,
  cardIssuer: string, //VISA | MASTERCARD
  cardLastDigits: string,
  createdAt: Date,
  updatedAt: Date,
}

export type createPayment = {
  ticketId: number,
	cardData: {
		issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
  }
}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};
