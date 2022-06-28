<script lang=ts>
import SignUpForm from '$lib/components/forms/sign-up.svelte';
import type { IUser } from '$lib/models/interfaces/user';

async function handleSignup(event: CustomEvent<IUser>) {
     const body = event.detail;
     try {
          const response = await fetch('/api/sign-up', {
               method: 'POST',
               body: JSON.stringify(body)
          });

          const data = await response.json();

          if(response.ok) {
               console.log('successfully');
          } else {
               const {errors: message} = data;
               const statusCode = response.status;
               throw {
                    status: statusCode,
                    message
               };         
          }
     } catch(error: any) {
          console.log(error.message);
     }
}
</script>

<section class="container">
     <header>
          <h1>회원가입</h1>
     </header>
     <main>
          <SignUpForm on:register={handleSignup}/>
     </main>
</section>

<style lang=scss>
     .container {
          width: 100%;
          max-width: 1160px;
          min-height: 100vh;
          margin: 0 auto;
          padding-top: 200px;

          header, main {
               @extend %child_layout;
          }

          header {
               h1 {
                    width: 100%;
                    text-align: center;
                    font-size: 2.9rem;
                    line-height: 4.3rem;
               }
          }

          %child_layout {
               width: 100%;
               max-width: 400px;
               margin: 0 auto;
          }
     }
</style>