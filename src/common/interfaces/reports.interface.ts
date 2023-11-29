export interface ICausationTable {
  accountNum: number;
  expeditionDate: Date;
  concept: string;
  valuePay: string;

  contract: {
    sender: string;
    debitAccount: string;
    creditAccount: string;
    business: {
      nit: string;
      name: string;
    };
  };
}

export interface ICausationFilters {
  expeditionDateFrom: Date;
  expeditionDateUntil: Date;
}

export interface IPaymentTable {
  trackingDate: string;
  accountStatement: {
    accountNum: number;
    concept: string;
    valuePay: string;
    contract: {
      sender: string;
      debitAccount: string;
      creditAccount: string;
      business: {
        nit: string;
        name: string;
      };
    };
  };
}

export interface IPaymentFilters {
  paymentDateFrom: Date;
  paymentDateUntil: Date;
}
