---
title: "Becoming a bioinformaticianator"
date: 2018-07-11T17:46:41-07:00
draft: false
---

Blog article in progress

### 1. Login without password

![ssh without password]( /~saghafoo/images/guides/ssh-without-password.gif "ssh without password") 

Key-based authentication is enabled on ASU servers which means you can log into it without entering your password by copying your public key to the server. The following instructions will work for most POSIX OS and if you use putty for SSHing you can learn how to setup ssh keys [over here](https://www.digitalocean.com/community/tutorials/how-to-create-ssh-keys-with-putty-to-connect-to-a-vps)

1. Generate an ssh key by typing in `ssh-keygen` which will by default generate a public key at `~/.ssh/id_rsa` unless a previous key exists in which it will ask you if you would like to override it. 

    ```
    Generating public/private rsa key pair.
    Enter file in which to save the key (/home/username/.ssh/id_rsa):
    /home/username/.ssh/id_rsa already exists.
    Overwrite (y/n)?
    Created directory '/home/username/.ssh'.
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again: 
    ```

2. Once your key is generated you can copy it to the server using the `ssh-copy-id` utility by typing in the following command 

    ```
    ssh-copy-id -i ~/.ssh/id_rsa.pub USERNAME@CLUSTER-HOSTNAME
    ```

3. You will be prompted to log into the server and once you do your key should be copied to the server and you should now be able to log into the server without a password and thus saving thousands of seconds which you can use to be frustrated with other things.

#### Bonus tip: Login even faster
You can log in even faster by using bash alias if you are using terminal by adding a bash alias to your `~/.bashrc` file. Open your `~/.bashrc` file in your favorite editor and add the following line to:

```
alias hpc='ssh saghafoo@hpc.researchcomputing.asu.edu'
```

And voila! Now you can log in by simply typing `hpc` in terminal.

---

### 2. Optimize job's resource usage

> Take all you can ~~eat~~ use but ~~eat~~ use all you take.

One of the issues with sbatch is that if you request a resource, the resource gets allocated to you and is not usable by anyone else until your job finishes even if you are not touching it. Because of that it is optimal to only request the amount of resource that you need. If the memory and cpu requirements are defined within your script but not in the sbatch, your job will by default try to hog as much memory as possible and to avoid that you can use `--mem=XX` in your sbatch to reserve XX amount of memory (in mb by default).

It can be difficult to know the optimal configuration for a job but it is relatively easier to find the number of threads a job can possibility utilize and upper bound of the memory. In java based toolkits like GATK you have to specify the memory and you can use the same amount of memory plus a little bit more in your sbatch when reserving memory. The more slurm knows about your job's resource requirement the better it can optimize resource usage.

---
### 3. Monitor job performance

![htop]( /~saghafoo/images/guides/htop.gif "htop") 

It is easy to know when your job runs out of resources but it can be difficult to know when your job might be using too much. There is no ideal way to estimate how much resources a job requires and even the same job might requiring different resources for different inputs. There might be better techniques out there but the best technique that I have found so far is to start an interactive session on your cluster (with limited resources ofcourse) and running the htop utility.

```
interactive --mem=100 -c 1 -n 1
```

Which will actively show you how much of the resources are in use (Note: This does not tell you how much was reserved, only how much is in use which can differ vastly). To check how much resources a job reserved you can visit [rcstatus.asu.edu](https://rcstatus.asu.edu/) website and viewing running jobs. Alternatively, you can also use the `squeue` command in conjunction with `watch` command to get a compact view of running jobs.

```
watch -n1 squeue -p PARTITION-NAME
```

The above command will run the squeue command every second and give you the following view

![watch squeue]( /~saghafoo/images/guides/squeue.gif "watch squeue") 

---

### 4. Find the best node for the job

While it is obvious to choose the best partition within a cluster like serial, long, CUDA or SMP there are variations between the configurations of nodes within a partition that can also help speed up your job. For example, the newer processors support [**AVX**](https://en.wikipedia.org/wiki/Advanced_Vector_Extensions) instruction set which allows a processor to add multiple variables in a single cpu cycle and thus significantly cutting down computation time. 

1. The first step is to check if your job supports AVX by looking through the process logs. For example when using [GATK HaplotypeCaller](https://software.broadinstitute.org/gatk/documentation/tooldocs/4.0.5.0/org_broadinstitute_hellbender_tools_walkers_haplotypecaller_HaplotypeCaller.php) you might see something like this in the log:

    ``` 
    WARN  13:28:06,668 PairHMMLikelihoodCalculationEngine - AVX-accelerated native PairHMM implementation is not supported. Falling back to slower LOGLESS_CACHING implementation 
    ```
2. The second step is to find which nodes on your cluster support AVX. For Saguaro you can go to the [partitions page](https://rcstatus.asu.edu/saguaro/howto/partitions.php) and look through the features for each partition. For example, on Default partition there are four different types of nodes and only two of them support AVX which are SandyBridge and IvyBridge.

3. Next you can add a constraint in your slurm script to only run on either SandyBridge or IvyBridge. You can do so by adding the following arguments to your slurm script headers

    ```
    #SBATCH --constraint="SandyBridge|IvyBridge"
    ```
Which means run the script on a node that satisfies either constraint. You can visit [sbatch documentation](https://slurm.schedmd.com/sbatch.html) for complete list of commands and their combinations.

In most cases chosing the best node would not give you a better performance out of the box specially if your program uses libraries like CUDA. However, with some optimization the time saved might be worth it.

### Bonus tip: Bash history

My life has not been the same since I learned this command last year. You know how you sometimes have to use up arrow more than a couple of times to found a command you wrote a few commands ago, maybe even during last session? Well you can type in `history` to view all of your old commands! Not only that, the history commands are numbered and if you want to execute any command from your history simple type in '!' followed by the number. 

![history command]( /~saghafoo/images/guides/history.png "history command") 

In the above picture you could fo rexample run command # 2736 by typing in `!2736`. The names for the commands always stay the same so 2736 will always be bound to the same command and new lines will be appended to the history. 

Thanks to [Bertrand](https://www.linkedin.com/in/bertrand-hornsby/) for this lifechanging tip!

---
## DRAFT - Snakemake tips

Has tons of features like using remote files, google cloud but these are the ones i found useful. Things don't execute sequentially and thus counter intuitive but powerful when learned.

### 1. Define cluster per rule

---
### 2. Define all required files in input
So error happens at DAG time instead of runtime. Useful specially in samtools

---

### 3. Only define final output in rule all

---

### 4. Rule order only used to resolve ambigiouity

---

### 5. Use python functions 

