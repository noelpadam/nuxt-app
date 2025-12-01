import Elysia from "elysia";
import { cron } from '@elysiajs/cron'

export default () => new Elysia()
  .get('/hello', () => ({ message: 'Hello from me..' }))
  .use(
		cron({
			name: '2FHE',
			pattern: '0 18 * * *',
			run() {
				console.log('2FHE...')
			}
		})
	)
	.get(
		'/stop',
		({
			store: {
				cron: { heartbeat }
			}
		}) => {
			heartbeat.stop()

			return 'Stop heartbeat'
		}
	);
