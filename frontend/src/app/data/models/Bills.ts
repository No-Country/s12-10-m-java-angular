export interface BillRequestDto {
  userId: string;
  delivery: boolean;
  paymentMethods: 'CASH' | 'DEBIT' | 'CREDIT';
  address: string | null;
  bookQuantities: { [id: string]: number };
}

export interface BillResponseDto {
  id: number;
  totalPrice: number;
  dateBill: string;
  paymentMethods: 'CASH' | 'DEBIT' | 'CREDIT';
  address: string | null;
  delivery: boolean;
  userId: string;
  billItems: { [id: string]: number };
}