import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function FakeNewsGame() {
  const navigation = useNavigation();

  const gameQuestions = [
    {
      id: 1,
      question: "URGENTE! OMS CONCLUI QUE PACINENTES ASSINTOMÁTICOS NÃO TEM POTENCIAL DE INFECTAR OUTRAS", // Exemplo do PDF, com erro de digitação
      correctAnswer: "Fake",
      explanation: "Este título possui erros de português e parece sensacionalista, usando letras maiúsculas e vocabulário confuso. Desconfie de títulos assim!"
    },
    {
      id: 2,
      question: "Estudo Científico Comprova: Comer Chocolate Todos os Dias Cura o Câncer!",
      correctAnswer: "Fake",
      explanation: "Parece bom demais para ser verdade! Notícias sobre curas milagrosas sem base em instituições de pesquisa sérias são quase sempre fake news. Verifique a fonte e a data do estudo."
    },
    {
      id: 3,
      question: "Boato se Espalha: Água da Torneira da Cidade X Causa Doença Rara!",
      correctAnswer: "Fake",
      explanation: "Notícias que geram pânico ou 'boatos' devem ser checadas com as autoridades de saúde ou saneamento locais. Verifique se a fonte é oficial e confiável."
    },
    {
      id: 4,
      question: "Prefeitura de Manaus Anuncia Novo Programa de Reciclagem para Bairros da Zona Sul.",
      correctAnswer: "Fato",
      explanation: "Notícias sobre ações governamentais podem ser verificadas nos canais oficiais da prefeitura ou em jornais de credibilidade. Este título é direto e factível."
    },
    {
      id: 5,
      question: "Foto de Gato de Três Olhos Encontrado na Floresta Amazônica Viraliza!",
      correctAnswer: "Fake",
      explanation: "Imagens inacreditáveis, especialmente de coisas raras ou bizarras, são frequentemente manipuladas ou tiradas de contexto. Use a busca reversa de imagens para verificar a originalidade."
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [lastExplanation, setLastExplanation] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = (answer) => {
    const currentQuestion = gameQuestions[currentQuestionIndex];
    const isCorrect = (answer === currentQuestion.correctAnswer);

    setLastAnswerCorrect(isCorrect);
    setLastExplanation(currentQuestion.explanation);
    setShowResult(true);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    if (currentQuestionIndex < gameQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleRestartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setLastAnswerCorrect(false);
    setLastExplanation('');
    setGameOver(false);
  };

  const currentQuestion = gameQuestions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#87CEEB', '#120A8F']} start={{ x: 0.3, y: 0 }} style={styles.background} />

      <Animatable.View animation="fadeInDown" style={styles.header}>
        <Text style={styles.title}>É Fato ou Fake?</Text>
        <Text style={styles.scoreText}>Pontuação: {score}/{gameQuestions.length}</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.gameArea}>
        {gameOver ? (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Jogo Finalizado!</Text>
            <Text style={styles.finalScoreText}>Sua pontuação final: {score} de {gameQuestions.length}</Text>
            <TouchableOpacity style={styles.restartButton} onPress={handleRestartGame}>
              <Text style={styles.buttonText}>Jogar Novamente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            {!showResult ? (
              <View style={styles.answerButtonsContainer}>
                <TouchableOpacity style={styles.factButton} onPress={() => handleAnswer("Fato")}>
                  <Text style={styles.buttonText}>Fato</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fakeButton} onPress={() => handleAnswer("Fake")}>
                  <Text style={styles.buttonText}>Fake</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Animatable.View animation="fadeIn" style={styles.resultContainer}>
                <Text style={[styles.resultText, lastAnswerCorrect ? styles.correct : styles.incorrect]}>
                  {lastAnswerCorrect ? "Correto!" : "Incorreto!"}
                </Text>
                <Text style={styles.explanationText}>{lastExplanation}</Text>
                <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                  <Text style={styles.buttonText}>Próxima Pergunta</Text>
                </TouchableOpacity>
              </Animatable.View>
            )}
          </ScrollView>
        )}
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  questionContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  answerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  factButton: {
    backgroundColor: '#4CAF50', // Verde para Fato
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 10,
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  fakeButton: {
    backgroundColor: '#F44336', // Vermelho para Fake
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 10,
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  correct: {
    color: '#4CAF50',
  },
  incorrect: {
    color: '#F44336',
  },
  explanationText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  nextButton: {
    backgroundColor: '#2196F3', // Azul para Próxima Pergunta
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  gameOverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  gameOverText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  finalScoreText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  backButton: {
    backgroundColor: '#9E9E9E', // Cinza para Voltar
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
