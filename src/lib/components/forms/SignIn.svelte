<script lang=ts>
     import { toasts } from "$lib/store/toast";
     import {form, field} from 'svelte-forms';
     import {required, email} from 'svelte-forms/validators';
     import {goto} from '$app/navigation';
     import {signInWithEmail, handleFirebaseError} from '$lib/client/firebase';
    
    
     const errors: any = {
        required: "필수 정보입니다.",
        not_an_email: "이메일 형식으로 입력해주세요."
     }

     const id = field('id', '', [required(), email()], {
        valid: false
     });

     const password = field('password', '', [required()], {
        valid: false
     });

     const signInForm = form(id, password);

     async function login() {
        try {
        } catch (error) {
            console.log(error);
        }
     }

     function handleSubmit() {
        const {id, password} = $signInForm.summary as {
            id: string;
            password: string;
        };

        const body: any = {
            email: id,
            password 
        };

        handleSignIn(body);
     }

     async function handleSignIn(body: any) {
        try {
            const user = await signInWithEmail(body);
            if (user) {
                toasts.open('로그인 완료되었습니다.');
                goto('/');
            }
        } catch (error: any) {
            console.log(error.code);
            const message = handleFirebaseError(error.code);
            toasts.open(message, 'error');
        }
     }
</script>

<!-- svelte-ignore component-name-lowercase -->
<form on:submit|preventDefault={handleSubmit}>
    <div class="form-control">
        <label for="email">이메일</label>
        <input type="text" 
               id="email"
               bind:value={$id.value}
               on:blur={id.validate}
               />
        {#if $id.errors.length}
            <p class="error-message">
                {errors[$id.errors[0]]}
            </p>
        {/if}
    </div>
    
    <div class="form-control">
        <label for="password">비밀번호</label>
        <input type="password"
               id="password"
               bind:value={$password.value}
               on:blur={password.validate}
               />
        {#if $password.errors.length}
            <p class="error-message">
                {errors[$password.errors[0]]}
            </p>
        {/if}
    </div>

    <div class="form-control">
        <button type="submit" disabled={!$signInForm.valid}>로그인</button>
    </div>

    <div>
        <button type="button" on:click={login}>구글 로그인</button>
    </div>
</form>

<style lang=scss>
    form {
        width: 100%;
        .form-control {
            width: 100%;
            margin-top: 24px;

            label {
                font-size: 1.5rem;
                line-height: 2.2rem;
                margin-bottom: 0.8rem;
            }

            .error-message {
                font-size: 1.3rem;
                line-height: 1.882rem;
                font-weight: 400;
                color: #a61b3b;
                margin-top: 0.8rem;
            }

            input,
            button {
                width: 100%;
                height: 5.2rem;
                border-radius: 0.4rem;
                border: 0.1rem solid #999;
                font-size: 1.6rem;
                line-height: 2.3rem;
                padding: 1.4rem 1.6rem;
            }

            input {
                &:disabled,
                &[disabled] {
                    background-color: rgba(187, 187, 187, 0.4);
                    cursor: not-allowed;
                }
            }

            button {
                cursor: pointer;

                &[type="submit"] {
                background-color: #ee2554;
                color: #fff;
                }

                &:disabled,
                &[disabled] {
                    background-color: #bbbbbb;
                    color: #fff;
                }
            }
        }
    }

</style>