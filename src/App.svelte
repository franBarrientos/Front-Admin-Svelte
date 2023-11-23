<script lang="ts">
  import Router, {link, replace} from 'svelte-spa-router'
  import {routes} from './routes/routes' 
	import Swal from 'sweetalert2';

  const conditionsFailed = () => {
    console.log('Conditions failed')
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You must be Authorized!',
      timer: 2000
    })
    replace('/')
  }
</script>

<main>
    <Router {routes}  on:conditionsFailed={conditionsFailed}/>
</main>


