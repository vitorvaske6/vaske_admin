cube(`CarSales`, {
  sql: `SELECT * FROM public."CarSales"`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, clientname]
    },

    closed_deals: {
      sql: `${CUBE}."ID"`,
      type: `count`,
      drillMembers: [deal_status],
      filters: [{ sql: `${CUBE}."Status" = 'Fechado'` }],
    },

    deals: {
      sql: `${CUBE}."ID"`,
      type: `count`,
    },

    open_deals: {
      sql: `${CUBE}."ID"`,
      type: `count`,
      drillMembers: [deal_status],
      filters: [{ sql: `${CUBE}."Status" <> 'Fechado'` }],
    },
    
    salevalue: {
      sql: `${CUBE}."SaleValue"`,
      type: `sum`
    },
    
    cost: {
      sql: `${CUBE}."Cost"`,
      type: `sum`
    },
    
    totaldiscount: {
      sql: `${CUBE}."TotalDiscount"`,
      type: `sum`
    },
    
    deliverycost: {
      sql: `${CUBE}."DeliveryCost"`,
      type: `sum`
    },
    
    laborcost: {
      sql: `${CUBE}."LaborCost"`,
      type: `sum`
    }
  },
  
  dimensions: {
    id: {
      sql: `${CUBE}."ID"`,
      type: `number`,
      primaryKey: true
    },

    invoiceDate: {
      sql: `${CUBE}."InvoiceDate"`,
      type: `time`,
      title: `Invoice Date`
    },

    manufacturer: {
      sql: `${CUBE}."Manufacturer"`,
      type: `string`
    },
    
    state: {
      sql: `${CUBE}."State"`,
      type: `string`
    },
    
    clientname: {
      sql: `${CUBE}."ClientName"`,
      type: `string`
    },
    
    model: {
      sql: `${CUBE}."Model"`,
      type: `string`
    },
    
    color: {
      sql: `${CUBE}."Color"`,
      type: `string`
    },
    
    deal_status: {
      sql: `${CUBE}."Status"`,
      type: `string`
    }
  }
});
