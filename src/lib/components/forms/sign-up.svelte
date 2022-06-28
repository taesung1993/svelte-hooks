<script lang=ts>
import type { IUser } from '$lib/models/interfaces/user';

import { createEventDispatcher } from 'svelte';
import {form , field} from 'svelte-forms';
import {required, matchField, email} from 'svelte-forms/validators';
const errors: any = {
required: '필수 정보입니다.',
'not_an_email': '이메일 형식으로 입력해주세요.',
'match_field': '비밀번호가 일치하지 않습니다.'
}
const dispatch = createEventDispatcher<{register: IUser}>();

const id = field('id', '', [required(), email()], {valid: false});
const password = field('password', '', [required()], {valid: false});
const passwordConfirmation = field('passwordConfirmation', '', [ required(), matchField(password)], {valid: false});
const signUpForm = form(id, password, passwordConfirmation);

function handleSubmit() {
    const {id, password} = $signUpForm.summary as {id: string; password: string; passwordConfirmation: string};
    const body: any = {
        email: id,
        password
    };

    console.log(body);
    
    dispatch('register', body);
}

function handlePassword(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    const value = target.value;

    if(value === '') {
        passwordConfirmation.reset();  
    }
}
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="form-control">
        <label for="email">이메일</label>
        <input 
            type="text"
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
        <input 
            type="password" 
            id="password"
            bind:value={$password.value}
            on:blur={password.validate}
            on:input={handlePassword}
        />
        {#if $password.errors.length}
            <p class="error-message">
                {errors[$password.errors[0]]}
            </p>
        {/if}
    </div>
    <div class="form-control">
        <label for="password-confirm">비밀번호 재확인</label>
        <input 
            type="password" 
            id="password-confirm"
            disabled={$password.invalid}
            bind:value={$passwordConfirmation.value}
            on:blur={passwordConfirmation.validate}
        />
        {#if $passwordConfirmation.errors.length}
            <p class="error-message">
                {errors[$passwordConfirmation.errors[0]]}
            </p>
        {/if}
    </div>

    <div class="form-control">
        <button type="submit" disabled={!$signUpForm.valid}>Send form</button>
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
                color: #A61B3B;
                margin-top: 0.8rem;
            }

            input, button {
                width: 100%;
                height: 5.2rem;
                border-radius: 0.4rem;
                border: 0.1rem solid #999;
                font-size: 1.6rem;
                line-height: 2.3rem;
                padding: 1.4rem 1.6rem;
            }

            input {
                &:disabled, &[disabled] {
                    background-color: rgba(187, 187, 187, 0.4);
                    cursor: not-allowed;
                }
            }

            button {
                cursor: pointer;
                
                &[type=submit] {
                    background-color: #ee2554;
                    color: #fff;
                }

                &:disabled, &[disabled] {
                    background-color: #BBBBBB;
                    color: #fff;
                }
            }
        }
    }
</style>