<script lang=ts>
     import SignUpForm from '$lib/components/forms/SignUp.svelte';
</script>

<section class="container">
    <header>
         <h1>회원가입</h1>
    </header>
    <main>
         <SignUpForm/>
    </main>
</section>

<style lang=scss>
         .container {
          width: 100%;
          max-width: 1160px;
          min-height: 100vh;
          margin: 0 auto;
          padding-top: 10rem;

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