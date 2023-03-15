cube(`Tickets`, {
  sql: `SELECT * FROM hubspot.tickets`,
  
  joins: {
    
  },
  
  measures: {
    quantidade_total_de_tickets: {
      sql: `${CUBE}."Ticket ID"`,
      type: `count`,
      drillMembers: [statusVisaoCliente]
    },
    quantidade_de_tickets_abertos: {
      sql: `${CUBE}."Ticket ID"`,
      type: `count`,
      drillMembers: [statusVisaoCliente],
      filters: [{ sql: `${CUBE}."Status do ticket" <> 'Fechado'` }],
    },
    quantidade_de_tickets_fechados: {
      sql: `${CUBE}."Ticket ID"`,
      type: `count`,
      drillMembers: [statusVisaoCliente],
      filters: [{ sql: `${CUBE}."Status do ticket" = 'Fechado'` }],
    }
  },
  
  segments: {
    Fechado: {
      sql: `${CUBE}."Status do ticket" = 'Fechado'`
    },

    Aberto: {
      sql: `${CUBE}."Status do ticket" <> 'Fechado'`
    },
  },

  dimensions: {
    ticketId: {
      sql: `${CUBE}."Ticket ID"`,
      type: `string`
    },

    equipeDaHubspot: {
      sql: `${CUBE}."Equipe da HubSpot"`,
      type: `string`
    },
    
    associatedCompany: {
      sql: `${CUBE}."Associated Company"`,
      type: `string`
    },
    
    associatedContact: {
      sql: `${CUBE}."Associated Contact"`,
      type: `string`
    },
    
    prioridade: {
      sql: `${CUBE}."Prioridade"`,
      type: `string`
    },
    
    proprietRioDoTicket: {
      sql: `${CUBE}."Proprietário do ticket"`,
      type: `string`,
      title: `Proprietário Do Ticket`
    },
    
    categoriaDefeito: {
      sql: `${CUBE}."Categoria Defeito"`,
      type: `string`
    },
    
    resoluO: {
      sql: `${CUBE}."Resolução"`,
      type: `string`,
      title: `Resolução`
    },
    
    pipeline: {
      sql: `${CUBE}."Pipeline"`,
      type: `string`
    },
    
    fonte: {
      sql: `${CUBE}."Fonte"`,
      type: `string`
    },
    
    statusVisaoCliente: {
      sql: `${CUBE}."Status Visão Cliente"`,
      type: `string`,
      title: `Status Visão Cliente`
    },
    
    outrasPecas: {
      sql: `${CUBE}."1 - Outras Peças "`,
      type: `string`,
      title: `1 - Outras Peças `
    },
    
    statusDoTicket: {
      sql: `${CUBE}."Status do ticket"`,
      type: `string`
    },
    
    novoImei: {
      sql: `${CUBE}."Novo IMEI"`,
      type: `string`
    },
    
    associatedCompanyIds: {
      sql: `${CUBE}."Associated Company IDs"`,
      type: `string`
    },
    
    associatedContactIds: {
      sql: `${CUBE}."Associated Contact IDs"`,
      type: `string`
    },
    
    caaTipoDeAtendimento: {
      sql: `${CUBE}."CAA - Tipo de Atendimento"`,
      type: `string`,
      title: `Caa - Tipo De Atendimento`
    },
    
    statusSla1: {
      sql: `${CUBE}."Status SLA 1"`,
      type: `string`,
      title: `Status Sla 1`
    },
    
    statusSla2: {
      sql: `${CUBE}."Status SLA 2"`,
      type: `string`,
      title: `Status Sla 2`
    },
    
    statusSla3: {
      sql: `${CUBE}."Status SLA 3"`,
      type: `string`,
      title: `Status Sla 3`
    },
    
    defeitoConstatado: {
      sql: `${CUBE}."Defeito constatado"`,
      type: `string`
    },
    
    defeitoInformadoCliente: {
      sql: `${CUBE}."Defeito Informado (Cliente)"`,
      type: `string`,
      title: `Defeito Informado (cliente)`
    },
    
    soluOAOSugeridaN1N2: {
      sql: `${CUBE}."Solução/Ação Sugerida N1/N2"`,
      type: `string`,
      title: `Solução/ação Sugerida N1/n2`
    },
    
    categoriaDeServiO: {
      sql: `${CUBE}."Categoria de Serviço"`,
      type: `string`,
      title: `Categoria De Serviço`
    },
    
    nomeDoTicket: {
      sql: `${CUBE}."Nome do ticket"`,
      type: `string`
    },
    
    dataDeCriaO: {
      sql: `${CUBE}."Data de criação"`,
      type: `time`,
      title: `Data De Criação`
    },
    
    dataDaLtimaModificaO: {
      sql: `${CUBE}."Data da última modificação"`,
      type: `time`,
      title: `Data Da Última Modificação`
    },
    
    dataDeAberturaDoChamado: {
      sql: `${CUBE}."Data de Abertura do chamado"`,
      type: `time`
    },
    
    dataDaLtimaAtividade: {
      sql: `${CUBE}."Data da última atividade"`,
      type: `time`,
      title: `Data Da Última Atividade`
    },
    
    dataDeFechamento: {
      sql: `${CUBE}."Data de fechamento"`,
      type: `time`
    }
  }
});
