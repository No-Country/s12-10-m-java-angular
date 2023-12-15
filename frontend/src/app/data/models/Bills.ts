interface BillRequestDto {
    userId: string;
    bookQuantities: Record<string, number>;
  }
  

  interface BillResponseDto {
    id: number;
    totalPrice: number;
    dateBill: string;
    userId: string;
    billItems: Record<string, number>;
  }