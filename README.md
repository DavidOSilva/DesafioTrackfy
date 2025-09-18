# 📊 Trackfy Dashboard - Desafio Técnico Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6B6B?style=for-the-badge&logo=chart.js&logoColor=white)

Uma aplicação web interativa desenvolvida para análise e visualização de dados demográficos, construída com **React** e **Vite**. O projeto apresenta dashboards dinâmicos, mapas interativos e sistemas de filtros avançados para exploração de dados populacionais por área e período temporal.

## 🎯 Sobre o Projeto

Este dashboard foi desenvolvido como parte de um desafio técnico, focado na criação de uma interface moderna e intuitiva para análise de dados demográficos. A aplicação permite visualizar distribuições populacionais através de gráficos interativos e mapas geográficos, oferecendo diferentes perspectivas de análise dos dados.

## ✨ Principais Funcionalidades

### 📈 **Dashboard Interativo**
- **Gráficos dinâmicos** com Recharts
- **Filtros avançados** com relacionamento entre componentes
- **Visualizações múltiplas**: gráficos de linha, barras empilháveis e pizza
- **Análise temporal** com filtros de instantes específicos

### 🗺️ **Mapa Interativo**
- **Mapa interativo** com React Leaflet
- **Marcadores circulares** representando áreas geográficas
- **Popups informativos** com dados populacionais
- **Cores diferenciadas** por área para melhor visualização

### 🔍 **Sistema de Filtros**
- **Filtros interdependentes**: `areaTypes` afeta dinamicamente `areaNames`
- **Agrupamento temporal**: Por dia, hora, ou períodos customizados
- **Filtro de instante temporal**: Visualize dados em momentos específicos
- **Preservação da estrutura original** dos dados fornecidos

## 🚀 Como Executar o Projeto

### 📋 **Pré-requisitos**
- Node.js (versão 16 ou superior)
- npm ou yarn

### 🛠️ **Instalação e Execução**

1. **Clone o repositório**
   ```bash
   git clone https://github.com/DavidOSilva/DesafioTrackfy.git
   cd DesafioTrackfy
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   - Abra seu navegador e acesse `http://localhost:5173`

### 📦 **Scripts Disponíveis**
- `npm run dev` - Executa a aplicação em modo de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção localmente

## 🏗️ **Arquitetura e Tecnologias**

### 🔧 **Stack Principal**
- **React 18** - Biblioteca principal para construção da interface
- **Vite** - Build tool moderna e rápida
- **React Context API** - Gerenciamento de estado global
- **CSS Modules** - Estilização componentizada

### 📊 **Visualização de Dados**
- **Recharts** - Biblioteca para gráficos interativos (nova descoberta no projeto)
  - Gráfico de **linha** para tendências temporais totais
  - Gráfico de **barras empilháveis** por área (evitando redundância de informações)
  - Gráfico de **pizza** para distribuição por área em instantes específicos

### 🗺️ **Mapeamento**
- **React Leaflet** - Mapas interativos (escolhido por experiência prévia, apesar das limitações)
- **Leaflet** - Biblioteca base para funcionalidades de mapa
- **Marcadores customizados** com círculos coloridos por área

## 🔄 **Sistema de Filtros e Decisões Técnicas**

### 🎛️ **Filtros Implementados**

1. **📍 Filtro de Tipo de Área (`areaTypes`)**
   - Afeta dinamicamente as opções disponíveis em `areaNames`
   - **Desafio**: O `AnexoII.json` não inclui o tipo em cada objeto do array
   - **Decisão**: Manter os dados originais intactos, implementando a lógica de relacionamento no frontend

2. **🏢 Filtro de Nomes de Área (`areaNames`)**
   - Dependente do filtro de tipos
   - Atualização dinâmica baseada na seleção anterior

3. **⏰ Agrupamento Temporal**
   - Opções: Por dia, hora, ou períodos customizados
   - Base para análise de tendências

4. **🕐 Filtro de Instante Temporal (Inovação)**
   - **Problema identificado**: Como exibir distribuição temporal em gráfico de pizza?
   - **Solução criativa**: Filtro que permite visualizar dados em instantes específicos
   - Funciona a partir do agrupamento estabelecido (ex: se agrupado por horas, pode-se visualizar uma hora específica)

### 🎯 **Decisões de Design de Dados**

- **Preservação dos dados originais**: Optei por não modificar os arquivos JSON fornecidos
- **Gráfico de barras empilháveis**: Usar áreas em vez de apenas totais evita redundância com o gráfico de linha
- **Relacionamento de filtros**: Implementação manual do relacionamento `areaTypes` → `areaNames`

## 📱 **Interface e Experiência**

- **Design responsivo** e moderno
- **Menu lateral** para navegação entre seções
- **Paleta de cores** consistente com a identidade Trackfy
- **Interatividade** em todos os componentes de visualização
- **Feedback visual** em filtros e seleções

## 🔮 **Possíveis Melhorias Futuras**

### 🗺️ **Melhorias de Mapeamento**
- **Migração para Mapbox**: Substituir React Leaflet por Mapbox para maior customização
- **Mapas vetoriais** mais performáticos
- **Estilos customizados** e melhor experiência visual
- **Funcionalidades avançadas** como clustering e heat maps

### 📊 **Melhorias de Visualização**
- **Gráficos 3D** para análises mais complexas
- **Animações** entre transições de filtros
- **Exportação** de gráficos em diferentes formatos
- **Dashboard customizável** pelo usuário

### 🔧 **Melhorias Técnicas**
- **TypeScript** para maior robustez
- **Testes automatizados** com Jest/Testing Library
- **PWA** para uso offline
- **Otimização de performance** com lazy loading

### 💾 **Melhorias de Dados**
- **API backend** para dados dinâmicos
- **Cache inteligente** para melhor performance
- **Sincronização em tempo real**
- **Histórico de análises** salvas pelo usuário

## 🤝 **Contribuição**

Este projeto foi desenvolvido como parte de um desafio técnico, mas sugestões e melhorias são sempre bem-vindas!

## 📄 **Licença**

Este projeto é parte de um desafio técnico para processo seletivo.

---

**Desenvolvido com ❤️ por David Silva** | **Desafio Técnico Frontend 2025**
