<script lang=ts>
  import Toast from './Toast.svelte';
  import {toasts} from '$lib/store/toast';

  function portal(node: HTMLElement) {
    const container = document.createElement('section');
    container.classList.add('navigators-container');
    container.appendChild(node);
    
    document.body.appendChild(container);

    return {
      destroy() {
        document.body.removeChild(container);
      }
    }
  }
</script>


<section use:portal class="navigators center">
  <Toast type='success'/>
  <Toast type='info'/>
  <Toast type='warning'/>
  <Toast type='error'/>
  <h1>Component</h1>
  <!-- {#each $toasts as toast}
    <div>
      {toast.message}
    </div> 
  {/each} -->
</section>

<style lang=scss>
  .navigators {
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &.center {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>