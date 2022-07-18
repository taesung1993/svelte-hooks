<script lang=ts>
     import {form, field} from 'svelte-forms';
     import {required, matchField, email} from 'svelte-forms/validators';

     const id = field('id', '', [required(), email()], {
        valid: false
     });

     const password = field('password', '', [required()], {
        valid: false
     });

     function handleSubmit() {
        console.log('submit');
     }
</script>

<!-- svelte-ignore component-name-lowercase -->
<form on:submit|preventDefault={handleSubmit}>
    <div class="form-control">
        <label for="email">이메일</label>
        <input type="text" 
               id="email"
               bind:value={$id.value}
               />
        <div>{$id.value}</div> 
    </div>
    
    <div class="form-control">
        <label for="password">비밀번호</label>
        <input type="password"
               id="password"
               bind:value={$password.value}
               />
    </div>

    <div class="form-control">
        <button type="submit">로그인</button>
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