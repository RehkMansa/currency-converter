interface APIResponse {
  status: string;
  message: string;
  data: Daum[];
}

interface Daum {
  id: string;
  name: string;
  base_unit: string;
  quote_unit: string;
  filters: Filters;
  trading_rules: TradingRules;
}

interface Filters {
  price_step?: number;
}

interface TradingRules {
  base_precision: number;
  quote_precision: number;
  price_precision: number;
  minimum_order_size: number;
}
