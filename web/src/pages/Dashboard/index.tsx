import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logo from '../../assets/logo.svg';

import { Title, Form, Repository, ErrorMessage } from './styles';

interface Repository {
	full_name: string;
	owner: {
		login: string;
		avatar_url: string;
	};
	description: string;
}

const Dashboard: React.FC = () => {
	const [newRepo, setNewRepo] = useState('');
	const [inputError, setInputError] = useState('');
	const [repositories, setRepositories] = useState<Repository[]>(() => {
		const storagedRepositories = localStorage.getItem(
			'@GitHunExplorer:repositories',
		);

		if (storagedRepositories) {
			return JSON.parse(storagedRepositories);
		}

		return [];
	});

	useEffect(() => {
		localStorage.setItem(
			'@GitHunExplorer:repositories',
			JSON.stringify(repositories),
		);
	}, [repositories]);

	async function handleAddRepository(
		event: FormEvent<HTMLFormElement>,
	): Promise<void> {
		event.preventDefault();

		if (!newRepo) {
			setInputError('Digite o autor/nome do repositório');
			return;
		}

		try {
			const response = await api.get<Repository>(`repos/${newRepo}`);

			console.log('response :', response.data);

			const repository = response.data;

			setRepositories([...repositories, repository]);
			setNewRepo('');
			setInputError('');
		} catch (error) {
			setInputError('Repositório não foi encontrado');
		}
	}

	return (
		<>
			<img src={logo} alt="GitHub Explorer" />
			<Title>Explore repositórios no GitHub.</Title>
			<Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
				<input
					placeholder="Digite o nome do repositório"
					value={newRepo}
					onChange={e => setNewRepo(e.target.value)}
				/>
				<button type="submit">Pesquisar</button>
			</Form>

			{inputError && <ErrorMessage>{inputError}</ErrorMessage>}

			<Repository>
				{repositories.map(repository => (
					<Link
						key={repository.full_name}
						to={`/repository/${repository.full_name}`}
					>
						<img
							src={repository.owner.avatar_url}
							alt={repository.owner.login}
						/>

						<div>
							<strong>{repository.full_name}</strong>
							<p>{repository.description}</p>
						</div>

						<FiChevronRight size={20} />
					</Link>
				))}
			</Repository>
		</>
	);
};

export default Dashboard;
