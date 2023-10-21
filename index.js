// a professora de portugues só pode segunda terca quarta
//
// a de educação fisica só pode quinta e sexta
//
// a de artes só vai quinta e sexta
//
// a de matematica não vai quinta
//
// a de lingua inglesa não vai na sexta
//
// a de ensino religioso só vai na quinta
//
// a de ciências não vai na sexta
//
// a de geografia não tem restrições
//
// a de história não tem restrições
//
// turismo só pode na quarta feira
//
// preferencialmente os periodos devem ser sempre de 2 em 2
// se possível e nunca mais que 2 seguidos na mesma turma,
// professores tem preferencia por dar 1 dia de aula inteiro quando precisam ir a escola

const materias = {
  portugues: {
    Jaqueline: {
      segunda: true,
      terca: true,
      quarta: true,
      quinta: false,
      sexta: false,
    },
  },
  educacaoFisica: {
    Maria: {
      segunda: false,
      terca: false,
      quarta: false,
      quinta: true,
      sexta: true,
    },
  },
  artes: {
    Joana: {
      segunda: false,
      terca: false,
      quarta: false,
      quinta: true,
      sexta: true,
    },
  },
  ingles: {
    Alexandra: {
      segunda: true,
      terca: true,
      quarta: true,
      quinta: true,
      sexta: false,
    },
  },
  religiao: {
    Rosane: {
      segunda: false,
      terca: false,
      quarta: false,
      quinta: true,
      sexta: false,
    },
  },
  matematica: {
    lucas: {
      segunda: true,
      terca: true,
      quarta: true,
      quinta: true,
      sexta: false,
    },
  },
  espanhol: {
    tatiana: {
      segunda: true,
      terca: true,
      quarta: true,
      quinta: true,
      sexta: false,
    },
  },
  ciencias: {
    daniel: {
      segunda: true,
      terca: true,
      quarta: true,
      quinta: true,
      sexta: false,
    },
  },
  geografia: {
    marcia: {
      segunda: true,
      terca: true,
      quarta: true,
      quinta: true,
      sexta: true,
    },
  },
  historia: {
    joao: {
      segunda: true,
      terca: true,
      quarta: true,
      quinta: true,
      sexta: true,
    },
  },
  turismo: {
    alex: {
      segunda: false,
      terca: false,
      quarta: true,
      quinta: false,
      sexta: false,
    },
  },
};

turmas = {
  "sexto ano": {
    portugues: 8,
    educacaoFisica: 2,
    artes: 2,
    ingles: 2,
    religiao: 1,
    matematica: 4,
    ciencias: 2,
    geografia: 2,
    historia: 2,
  },
  "setimo ano": {
    portugues: 4,
    educacaoFisica: 2,
    artes: 2,
    ingles: 2,
    religiao: 1,
    matematica: 8,
    ciencias: 2,
    geografia: 2,
    historia: 2,
  },
  "oitavo ano": {
    portugues: 4,
    educacaoFisica: 2,
    artes: 2,
    ingles: 2,
    religiao: 1,
    matematica: 4,
    ciencias: 2,
    geografia: 4,
    historia: 4,
  },
  "nono ano": {
    portugues: 4,
    educacaoFisica: 2,
    artes: 2,
    espanhol: 2,
    religiao: 1,
    matematica: 4,
    ciencias: 4,
    geografia: 2,
    historia: 2,
    turismo: 2,
  },
};

const periodosPorDia = 5;
const diasDaSemana = ["segunda", "terca", "quarta", "quinta", "sexta"];
const professoresLivresPorDia = {};
const professoresOcupadosPorDia = {};

diasDaSemana.forEach((dia) => {
  professoresLivresPorDia[dia] = { qtd: 0 };
  professoresOcupadosPorDia[dia] = { qtd: 0 };
  for (materia in materias) {
    for (professor in materias[materia]) {
      if (materias[materia][professor][dia]) {
        professoresLivresPorDia[dia][professor] = materia;
        professoresLivresPorDia[dia]["qtd"]++;
      } else {
        professoresOcupadosPorDia[dia][professor] = materia;
        professoresOcupadosPorDia[dia]["qtd"]++;
      }
    }
  }
});

const diasOrdenadosPorDisponibilidadeAsc = [...diasDaSemana].sort((a, b) => {
  if (professoresLivresPorDia[a].qtd < professoresLivresPorDia[b].qtd) {
    return -1;
  }
  if (professoresLivresPorDia[a].qtd > professoresLivresPorDia[b].qtd) {
    return 1;
  }
  return 0;
});

const periodosLivresPorTurma = {};
const periodosLivresPorProfessor = {};
const qtdPeriodosPorDia = 5;

const modeloDiaLivre = { qtd: 5 };
for (let i = 1; i <= 5; i++) {
  modeloDiaLivre[i] = true;
}

diasDaSemana.forEach((dia) => {
  for (professor in professoresLivresPorDia[dia]) {
    if (professor !== "qtd") {
      if (professoresLivresPorDia[dia][professor]) {
        if (!periodosLivresPorProfessor[professor]) {
          periodosLivresPorProfessor[professor] = {};
        }

        periodosLivresPorProfessor[professor][dia] = {
          ...modeloDiaLivre,
          materia: professoresLivresPorDia[dia][professor],
        };
      }
    }
  }
});

for (turma in turmas) {
  diasDaSemana.forEach((dia) => {
    if (!periodosLivresPorTurma[turma]) periodosLivresPorTurma[turma] = {};

    periodosLivresPorTurma[turma][dia] = { ...modeloDiaLivre };
  });
}

const horario = {};

for (turma in periodosLivresPorTurma) {
  let materiasNecessarias = { ...turmas[turma] };
  diasOrdenadosPorDisponibilidadeAsc.forEach((dia) => {
    if (!horario[dia]) {
      horario[dia] = {};
    }
    if (!horario[dia][turma]) {
      horario[dia][turma] = {};
    }

    for (periodo in periodosLivresPorTurma[turma][dia]) {
      if (periodo !== "qtd" && periodosLivresPorTurma[turma][dia][periodo]) {
        for (professor in periodosLivresPorProfessor) {
          if (periodosLivresPorTurma[turma][dia][periodo]) {
            const professorSelecionado = periodosLivresPorProfessor[professor];

            if (
              professorSelecionado[dia] &&
              professorSelecionado[dia][periodo] &&
              professorSelecionado[dia]["qtd"] > 0 &&
              materiasNecessarias[professorSelecionado[dia]["materia"]] > 0 &&
              `${professor} - ${professorSelecionado[dia]["materia"]}` !==
              horario[dia][turma][Number(periodo) - 1]
            ) {
              materiasNecessarias[professorSelecionado[dia]["materia"]] =
                materiasNecessarias[professorSelecionado[dia]["materia"]] - 1;
              periodosLivresPorTurma[turma][dia][periodo] = false;
              periodosLivresPorProfessor[professor][dia][periodo] = false;
              horario[dia][turma][
                periodo
              ] = `${professor} - ${professorSelecionado[dia]["materia"]}`;

              if (
                periodo < qtdPeriodosPorDia &&
                materiasNecessarias[professorSelecionado[dia]["materia"]] > 0 &&
                periodosLivresPorTurma[turma][dia][Number(periodo) + 1] &&
                `${professor} - ${professorSelecionado[dia]["materia"]}` !==
                  horario[dia][turma][Number(periodo) - 1]
              ) {
                periodosLivresPorTurma[turma][dia][Number(periodo) + 1] = false;
                periodosLivresPorProfessor[professor][dia][
                  Number(periodo) + 1
                ] = false;
                horario[dia][turma][
                  Number(periodo) + 1
                ] = `${professor} - ${periodosLivresPorProfessor[professor][dia]["materia"]}`;
              }
            }
          }
        }
      }
    }
  });
}
console.log('--SEGUNDA--');
console.log(horario['segunda']);
console.log('--TERCA--');
console.log(horario['terca']);
console.log('--QUARTA--');
console.log(horario['quarta']);
console.log('--QUINTA--');
console.log(horario['quinta']);
console.log('--SEXTA--');
console.log(horario['sexta']);

