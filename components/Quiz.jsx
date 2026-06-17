'use client';
// Quiz de autoestudo — 1 pergunta/tela, feedback explicativo (acerto e erro),
// erradas voltam ao fim, progresso em localStorage['ted77-progresso'].
import { useEffect, useReducer, useState } from 'react';

function reducer(s, a) {
  switch (a.tipo) {
    case 'responder': {
      const certa = a.alt === s.fila[0].correta;
      return { ...s, resposta: a.alt, certa,
        acertosUnicos: certa && !s.repetida ? s.acertosUnicos + 1 : s.acertosUnicos };
    }
    case 'proxima': {
      const [atual, ...resto] = s.fila;
      const fila = s.certa ? resto : [...resto, { ...atual, repetiu: true }];
      return { ...s, fila, resposta: null, certa: null,
        repetida: fila[0]?.repetiu || false,
        respondidas: s.certa ? s.respondidas + 1 : s.respondidas,
        concluido: fila.length === 0 };
    }
    case 'reiniciar':
      return estadoInicial(a.questoes);
    default:
      return s;
  }
}

function estadoInicial(questoes) {
  return { fila: questoes.map((q) => ({ ...q })), resposta: null, certa: null,
    respondidas: 0, acertosUnicos: 0, repetida: false, concluido: false };
}

export default function Quiz({ artigoId, questoes, titulo }) {
  const [s, dispatch] = useReducer(reducer, questoes, estadoInicial);
  const [seloSalvo, setSeloSalvo] = useState(false);
  const total = questoes.length;

  useEffect(() => {
    if (s.concluido && !seloSalvo) {
      try {
        const prog = JSON.parse(localStorage.getItem('ted77-progresso') || '{}');
        prog[artigoId] = { concluidoEm: new Date().toISOString(), acertosPrimeira: s.acertosUnicos, total };
        localStorage.setItem('ted77-progresso', JSON.stringify(prog));
        window.dispatchEvent(new Event('ted77-progresso'));
        setSeloSalvo(true);
      } catch { /* navegação privada */ }
    }
  }, [s.concluido, seloSalvo, artigoId, s.acertosUnicos, total]);

  if (s.concluido) {
    return (
      <div className="quiz-fim" role="status">
        <div className="selo-ok" aria-hidden="true">✓</div>
        <h4>Artigo concluído!</h4>
        <p>Você acertou <b>{s.acertosUnicos} de {total}</b> na primeira tentativa
          {s.acertosUnicos === total ? ' — impecável!' : ' e revisou as demais até dominar.'}</p>
        <p className="quiz-nota">Seu progresso fica salvo neste navegador e aparece nas páginas de eixo temático.</p>
        <button className="btn sec" onClick={() => dispatch({ tipo: 'reiniciar', questoes })}>
          Refazer o quiz
        </button>
      </div>
    );
  }

  const q = s.fila[0];
  const pct = Math.round(100 * s.respondidas / total);
  return (
    <div className="quiz" aria-label={`Quiz: ${titulo}`}>
      <div className="quiz-topo">
        <span>Pergunta {Math.min(s.respondidas + 1, total)} de {total}{s.repetida ? ' · revisão' : ''}</span>
        <div className="quiz-barra" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>
      <p className="quiz-pergunta">{q.p}</p>
      <div className="quiz-alts">
        {q.alts.map((alt, i) => {
          let classe = 'quiz-alt';
          if (s.resposta !== null) {
            if (i === q.correta) classe += ' certa';
            else if (i === s.resposta) classe += ' errada';
            else classe += ' apagada';
          }
          return (
            <button key={i} className={classe} disabled={s.resposta !== null}
              onClick={() => dispatch({ tipo: 'responder', alt: i })}>
              <b>{String.fromCharCode(97 + i)})</b> {alt}
            </button>
          );
        })}
      </div>
      {s.resposta !== null && (
        <div className={`quiz-feedback ${s.certa ? 'ok' : 'nao'}`} role="status">
          <b>{s.certa ? 'Certo!' : 'Ainda não.'}</b> {q.exp}
          {!s.certa && <i> Esta pergunta volta ao fim da fila para você revisar.</i>}
          <div>
            <button className="btn" onClick={() => dispatch({ tipo: 'proxima' })}>
              {s.fila.length === 1 && s.certa ? 'Concluir' : 'Próxima'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
