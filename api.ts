import Elysia from "elysia";
import { cron } from '@elysiajs/cron'

export default () => new Elysia()
  .get('/hello', () => ({ message: 'Hello from me..' }))
  .use(
		cron({
			name: '2FHE',
			pattern: '* * * /1 * *',
			run() {
				console.log('Heartbeat')
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
