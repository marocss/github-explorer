import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import { Title, Form, Repository } from './styles';

const Dashboard: React.FC = () => {
	return (
		<>
			<img src={logo} alt="GitHub Explorer" />
			<Title>Explore repositórios no GitHub.</Title>
			<Form>
				<input placeholder="Digite o nome do repositório" />
				<button type="submit">Pesquisar</button>
			</Form>

			<Repository>
				<a href="">
					<img
						src="https://avatars3.githubusercontent.com/u/34945925?s=460&u=6edadeac17d1837992e1527f2d6d4521b31ba830&v=4"
						alt="Marcos"
					/>

					<div>
						<strong>repositorio</strong>
						<p>descriçao</p>
					</div>

					<FiChevronRight size={20} />
				</a>
				<a href="">
					<img
						src="https://avatars3.githubusercontent.com/u/34945925?s=460&u=6edadeac17d1837992e1527f2d6d4521b31ba830&v=4"
						alt="Marcos"
					/>

					<div>
						<strong>repositorio</strong>
						<p>descriçao</p>
					</div>

					<FiChevronRight size={20} />
				</a>
			</Repository>
		</>
	);
};

export default Dashboard;
