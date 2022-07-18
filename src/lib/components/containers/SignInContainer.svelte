<script lang=ts>
     import SignInForm from "../forms/SignIn.svelte";
</script>

<section class="container">
    <header>
        <h1>회원 로그인</h1>
    </header>

    <main>
        <SignInForm/>
    </main>

    <footer>
        <a class="sign-up-btn" href="/sign-up">회원가입</a>
    </footer>
</section>

<style lang=scss>
    .container {
          width: 100%;
          max-width: 1160px;
          min-height: 100vh;
          margin: 0 auto;
          padding-top: 10rem;

          header, main, footer {
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

          footer { 
            padding-top: 7.2rem;

            a.sign-up-btn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 5.2rem;
                border-radius: 0.4rem;
                background-color: #323232;
                
                color: #fff;
                font-size: 1.6rem;
                line-height: 2.3rem;
                text-decoration: none;
                cursor: pointer;
            }
          }

          %child_layout {
               width: 100%;
               max-width: 400px;
               margin: 0 auto;
          }
     }
</style>