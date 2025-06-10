import re
import pickle
import string

def get_vectorization(path):
    with open(path, 'rb') as f:
        vectorization = pickle.load(f)
    
    return vectorization

def get_model(path):
    model = pickle.load(open(path, 'rb'))
    
    return model

def predict_text(text):
    random_forest_classifier_pkl = r'API\models\random_forest_classifier__TfidfVectorizer.pkl'
    vectorization_pkl = r'API\vectorizer\vectorizer.pkl'

    model = get_model(random_forest_classifier_pkl)
    vectorization = get_vectorization(vectorization_pkl)

    text = text.lower()
    text = re.sub(r'\[.*?\]','',text)
    text = re.sub(r"\\W"," ",text)
    text = re.sub(r'https?://\S+|www\.\S+','',text)
    text = re.sub(r'<.*?>+',b'',text)
    text = re.sub(r'[%s]' % re.escape(string.punctuation),'',text)
    text = re.sub(r'\w*\d\w*','',text)

    vector = vectorization.transform([text])
    
    return model.predict(vector)


text = """
Kátia Abreu diz que vai colocar sua expulsão em uma moldura, mas não para de reclamar.	
A senadora Kátia Abreu (sem partido-TO) disse que sua expulsão do PMDB foi resultado de uma ação da cúpula atual da legenda que, segundo ela, é oportunista.
“Amanhã eu vou botar numa moldura dourada a minha expulsão, porque das mãos de onde veio, é um atestado de boa conduta para o meu currículo. Essas pessoas que me expulsaram não servem ao país. Eles se servem do país em seus benefícios próprios”, disse Kátia Abreu.
Ué, mas se a expulsão é algo tão bom para seu currículo, por que tanta choradeira, Kátia?
Sabemos o motivo. Provavelmente Kátia não tem valor para o PT, partido que já deveria tê-la absorvido. Ao que parece o PT gostava de Kátia somente se ela ficasse entrincheirada dentro do PMDB.
Ou seja, isso é se rebaixar demais. Resta a Kátia ficar chorando as pitangas por todos os cantos.
Em tempo: até o momento o PT não cadastrou Kátia Abreu em suas fileiras. Que situação patética para a ex-ministra da Agricultura de Dilma.
"""

print(predict_text(text))
