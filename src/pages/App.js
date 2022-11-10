import { useState} from 'react';
import gitLogo from '../assets/github-icon-white-6.jpg';
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/itemRepo';
import { api } from '../services/api'

import { Container } from './styles';

function App() {

  const [currenRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);


  const handlesearchRepo = async () => {

    const {data} = await  api.get(`repo/${currenRepo}`)

    if(data.id) {

      const isExist = repos.find(repo => repo.id === data.id)

      if(!isExist) {
      setRepos(prev => [...prev, data]);
      setCurrentRepo('')
      return
      }
    }
    alert('Repositório não encontrado')
  }

  const handleRemoveRepo = (id) => {
    setRepos(prev => prev.filter(prev => prev.id !== id));
    setCurrentRepo('')
  }


  return (
    <Container>
       <img src={gitLogo} width={72} height={72}  alt="github-logo" />
       <Input value={currenRepo} onchange={(e) => setCurrentRepo(e.target.value)}/>
       <Button onClick={handlesearchRepo} />
       {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}

     </Container>
 );
}

export default App;
