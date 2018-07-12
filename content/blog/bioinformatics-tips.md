---
title: "Bioinformatics Tips"
date: 2018-07-11T17:46:41-07:00
draft: false
---

Here are some tips and tricks for optimizing your bioinformatics workflows. 

### 1. Login without password

![ssh without password]( /~saghafoo/images/guides/ssh-without-password.gif "ssh without password") 

Key-based authentication is enabled on ASU servers which means you can log into it without entering your password by copying your public key to the server. The following instructions will work for most POSIX OS and if you use putty for SSHing you can learn how to setup ssh keys by going [here](https://www.digitalocean.com/community/tutorials/how-to-create-ssh-keys-with-putty-to-connect-to-a-vps)

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

### 2. Specify resources in sbatch



---
### 3. Monitor job performance


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