export class Paciente {
    dadosPaciente: {
      userId: string,
      endereco: string,
      lat: number,
      lng: number,
      telefone: number,
      celular: number,
      nomeCartao: string,
      numeroCartao: number,
      mesCartao: number,
      anoCartao: number,
      cvvCartao: number
    };
    usuarioPaciente: {
      _id: string,
      name: string,
      email: string,
      cpf: number
    };
  }
