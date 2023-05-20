# Desenvolvimento WEB
## Estudantes: André Cristen e Lucas Levi Gonçalves 

### Implementação
<p>
    A aplicação foi implementada em duas partes, uma sendo o backend e a outra o frontend.
<p/>

#### Backend

<p>
      O backend foi implementado em Spring na versão v2.5.5, usando como gerenciador o Maven e utilizando os padrões de REST.
<p/>
<p>
    Para realizar a execução da aplicação basta realizar a instalação das dependencias do Maven através da IDE selecionado (Recomendamos o uso do IntelliJ).
<p/>

#### Frontend

<p>
    O frontend foi implementado usando React usando o axios para execução de chamadas HTTP e boostrap para otimização da estilização. Foram implementados os padrões de contexts do React para isolar requisições por contextos, que no caso foram separados em Public, Admin e Ecommerce, sendo Public as informações compartilhadas entre os módulos de Admin e Ecommerce e os demais especificos por módulo. 
<p/>
<p>
   Para realizar a execução basta realizar a instalação das dependencias usadno o 'npm install' e rodar o servidor local usando 'npm start', caso a sua aplicação de backend esteja rodando em uma porta diferente da 8080 é necessário atualizar o valor da const URL_API do arquivo src/services/api-public para o valor da sua execução.
<p/>

### Como usar a aplicação

#### Módulo Ecommerce
* Na página inical serão listados os produtos cadastrados (Inicialmente aparecerá vazio pois nenhum produto está cadastrado): 
![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/65c38055-c032-4cc8-ae89-13224336d1c7)
* Criação de conta de comprador:
  * Clique no menu login
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/4137fb67-8fad-469d-9f84-33cd17261be8)
  * Depois no botão de cadastrar-se
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/72ce4dd2-7b54-40d6-89be-105afd1b2b1e)
* Comprar item:
  * Clique no produto desejado na tela inicial
  * Selecione o tamanho e use a ação Adicionar ao carrinho 
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/3fb324eb-99a9-449a-9770-dc9064919fb9)
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/a175eac5-1bba-46a3-b2ca-c9dfb003f451)
  * Utilize a opção Finalizar compra
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/5d37571a-88e8-4528-b66c-51c68bb8a952)
  * Cadastre seus endereços e cartões nas respectivas ações
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/43bee96e-f05c-472f-b910-8372fb500a0c)
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/315871d9-17c6-41aa-b3bf-d79233852252)
  * Selecione os desejados clicando nos mesmos e finalize o pedido usando a ação 'FINALIZAR COMPRA'
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/8ba8be9a-b63d-4858-8e81-ab94180f2bf5)
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/84d0a48a-a4e2-49ce-9cd5-235233fcfebb)





  
  
#### Módulo Admin  
* Criação de conta de administrador:
  * Clique no botão 'Painel administrativo'
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/915e2684-02b8-437d-b07d-9347a1fd303b)
  * Depois no botão de cadastrar-se
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/7bba97f7-79e7-41b1-9258-94256a12e3db)
* Login:
  * Utilize o botão 'Painel administrativo' e efetue login com a conta criada
  * Tela inicial
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/7c742a51-8db1-408c-8a88-eb4bcb18f1b6)
* Criação de produto: 
  * Acesse o menu produtos 
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/975a2c72-ec45-4491-a6d7-6f762f8a5ca7)
  * Utilize a ação de adicionar, preecha os dados e para adicionar tamanhos use a ação 'Adicionar Derivação'
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/e2117e81-115b-459c-98e2-f47f4a9279e8)
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/03e7c75d-9093-408b-b200-e2d6908c60a5)
* Pedidos:
  * Os pedidos serão listados por situação nos submenus de pedidos e cada consulta mostrará as opções do pedido por situação.
  ![image](https://github.com/andrecristen/desenvolvimento-web/assets/30880513/23b6f98f-d37f-4dc8-b0c4-6cc717c218f3)

  




   


