export interface ApiResponseInterface<T> {
    content: T[]; // The actual data
    pageable: {
      pageNumber: number;
      pageSize: number;
      // Add other properties from pageable if needed
    };
    totalPages: number;
    totalElements: number;
    // Add other properties from the response if needed
  }